import axios from "axios";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Toast from "react-native-toast-message";
import { useUserContext } from "../contexts/UserContext";
import PrimaryButton from "./PrimaryButton";

export default function Register() {
  const [registerForm, setRegisterForm] = useState({ email: "", password: "", checkPassword: ""});

  const onChangeText = (str, field) => {
    setRegisterForm({ ...registerForm, [field]: str });
  };

  const [user, setUser] = useUserContext();

  const onSubmit = () => {
    axios
      .post("http://192.168.1.17:3310/api/users", {email: registerForm.email, password: registerForm.password, is_admin: 0})
      .then((res) => {
        console.log(res);
        setUser(res.data);
      })
      .catch((err) => {
        console.error(err);
        Toast.show({
          type: "error",
          text1: "Inscription échouée",
          text2: "Veuillez réessayer.",
        });
      });
  };

  return (
    <View style={styles.container}>
      <Text>Email</Text>
      <TextInput
        editable
        maxLength={40}
        onChangeText={(str) => onChangeText(str, "email")}
        value={registerForm.email}
        inputMode="email"
        style={styles.input}
      />
      <Text>Mot de passe</Text>
      <TextInput
        editable
        maxLength={40}
        onChangeText={(str) => onChangeText(str, "password")}
        value={registerForm.password}
        secureTextEntry={true}
        style={styles.input}
      />
      <Text>Confirmer le mot de passe</Text>
      <TextInput
        editable
        maxLength={40}
        onChangeText={(str) => onChangeText(str, "checkPassword")}
        value={registerForm.checkPassword}
        secureTextEntry={true}
        style={styles.input}
      />
      <PrimaryButton text="S'inscrire" onPress={onSubmit} />
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
		borderRadius: 5
  },
});
