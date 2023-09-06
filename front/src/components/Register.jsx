import axios from "axios";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Toast from "react-native-toast-message";
import { useUserContext } from "../contexts/UserContext";
import PrimaryButton from "./PrimaryButton";

export default function Register() {
  const [registerForm, setRegisterForm] = useState({
    email: "",
    password: "",
    checkPassword: "",
  });

  const onChangeText = (str, field) => {
    setRegisterForm({ ...registerForm, [field]: str });
  };

  const checkError = (errorNames) => {
    if (errorNames.includes("email")) {
      if (
        registerForm.email &&
        !registerForm.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)
      )
        return false;
    }

    if (errorNames.includes("password")) {
      if (
        registerForm.password &&
        !registerForm.password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g)
      )
        return false;
    }
    if (errorNames.includes("checkPassword")) {
      if (registerForm.checkPassword !== registerForm.password) return false;
    }

    if (errorNames.includes("allFields")) {
      if (
        !registerForm.email ||
        !registerForm.password ||
        !registerForm.checkPassword
      )
        return false;
    }
    return true;
  };

  const getErrorColor = (errorNames) => {
    return checkError(errorNames) ? "transparent" : "red";
  };

  const [user, setUser] = useUserContext();

  const onSubmit = () => {
    axios
      .post("http://192.168.1.17:3310/api/users", {
        email: registerForm.email,
        password: registerForm.password,
        is_admin: 0,
      })
      .then((res) => {
        axios
          .get(`http://192.168.1.17:3310/api/users/${res.data.insertId}`)
          .then((res2) => {
            setUser(res2.data);
            Toast.show({
              type: "success",
              text1: "Inscription réussie",
            });
          });
      })
      .catch((err) => {
        console.error(err);
        Toast.show({
          type: "error",
          text1: "Une erreur est survenue",
          text2: "Veuillez réessayer.",
        });
      });
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 40, fontWeight: "bold", marginBottom: 70 }}>
        Bienvenue !
      </Text>
      <View style={styles.formItem}>
        <Text>Email</Text>
        <TextInput
          editable
          maxLength={40}
          onChangeText={(str) => onChangeText(str, "email")}
          value={registerForm.email}
          inputMode="email"
          style={styles.input}
        />
        <Text style={{ color: getErrorColor(["email"]) }}>
          L'email doit être valide
        </Text>
      </View>
      <View style={styles.formItem}>
        <Text>Mot de passe</Text>
        <TextInput
          editable
          maxLength={40}
          onChangeText={(str) => onChangeText(str, "password")}
          value={registerForm.password}
          secureTextEntry={true}
          style={styles.input}
        />
        <Text style={{ color: getErrorColor(["password"]) }}>
          Le mot de passe doit contenir:
        </Text>
        <Text style={{ color: getErrorColor(["password"]) }}>
          8 caractères, 1 majuscule, 1 minuscule et 1 chiffre.
        </Text>
      </View>
      <View style={styles.formItem}>
        <Text>Confirmer le mot de passe</Text>
        <TextInput
          editable
          maxLength={40}
          onChangeText={(str) => onChangeText(str, "checkPassword")}
          value={registerForm.checkPassword}
          secureTextEntry={true}
          style={styles.input}
        />
        <Text style={{ color: getErrorColor(["checkPassword"]) }}>
          Les mots de passe doivent être identiques
        </Text>
      </View>
      <PrimaryButton
        text="S'inscrire"
        onPress={onSubmit}
        disable={
          !checkError(["email", "password", "checkPassword", "allFields"])
        }
      />
      <Text style={{ color: getErrorColor(["allFields"]) }}>
        Tous les champs doivent être remplis
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    gap: 15,
  },
  formItem: {
    width: "100%",
    alignItems: "center",
  },
  input: {
    height: 40,
    width: "50%",
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
});
