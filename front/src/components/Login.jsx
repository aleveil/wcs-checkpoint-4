import axios from "axios";
import { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Toast from "react-native-toast-message";
import { useUserContext } from "../contexts/UserContext";
import PrimaryButton from "./PrimaryButton";

export default function Login() {
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });

  const onChangeText = (str, field) => {
    setLoginForm({ ...loginForm, [field]: str });
  };

  const [user, setUser] = useUserContext();

  const onSubmit = () => {
    axios
      .post("http://192.168.1.17:3310/api/login", loginForm)
      .then((res) => {
        setUser(res.data);
        Toast.show({
          type: "success",
          text1: "Connexion réussie",
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
      <Text style={{ fontSize: 40, fontWeight: "bold", marginBottom: 70 }}>Bonjour !</Text>
      <Text>Email</Text>
      <TextInput
        editable
        maxLength={40}
        onChangeText={(str) => onChangeText(str, "email")}
        value={loginForm.email}
        inputMode="email"
        style={styles.input}
      />
      <Text>Mot de passe</Text>
      <TextInput
        editable
        maxLength={40}
        onChangeText={(str) => onChangeText(str, "password")}
        value={loginForm.password}
        secureTextEntry={true}
        style={styles.input}
      />
      <PrimaryButton text="Se Connecter" onPress={onSubmit} disable={!loginForm.email || !loginForm.password}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
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
