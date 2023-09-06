import { useState } from "react";
import { StyleSheet, Switch, Text, TextInput, View } from "react-native";
import PrimaryButton from "./PrimaryButton";
import axios from "axios";
import Toast from "react-native-toast-message";

export default function CreateUserForm({ closeModal, reloadUsers }) {
  const [userForm, setUserForm] = useState({
    email: "",
    password: "",
    is_admin: false,
  });

  const onChangeText = (str, field) => {
    setUserForm({ ...userForm, [field]: str });
  };

  const toggleIsAdmin = () => {
    setUserForm({ ...userForm, is_admin: !userForm.is_admin });
  };

  const onSubmit = () => {
    axios
      .post("http://192.168.1.17:3310/api/users", userForm)
      .then((res) => {
        reloadUsers();
        Toast.show({
          type: "success",
          text1: "Utilisateur créé avec succès",
        });
      })
      .catch((err) =>
        Toast.show({
          type: "error",
          text1: "Une erreur est survenue",
          text2: "Veuillez réessayer.",
        })
      );
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30, fontWeight: "bold", marginBottom: 70 }}>
        Nouvel Utilisateur
      </Text>
      <Text>Email</Text>
      <TextInput
        editable
        maxLength={40}
        onChangeText={(str) => onChangeText(str, "email")}
        value={userForm.email}
        inputMode="email"
        style={styles.input}
      />
      <Text>Mot de passe</Text>
      <TextInput
        editable
        multiline
        maxLength={1000}
        onChangeText={(str) => onChangeText(str, "password")}
        value={userForm.password}
        secureTextEntry={true}
        style={styles.input}
      />
      <Text>Administrateur</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={userForm.is_admin ? "#07D" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleIsAdmin}
        value={userForm.is_admin}
        style={{
          transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
          marginVertical: 30,
        }}
      />
      <View style={{ flexDirection: "row", gap: 50 }}>
        <PrimaryButton text="Annuler" onPress={closeModal} />
        <PrimaryButton
          text="Créer"
          onPress={() => {
            onSubmit();
            closeModal();
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    gap: 10,
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
