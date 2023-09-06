import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import PrimaryButton from "./PrimaryButton";
import axios from "axios";
import Toast from "react-native-toast-message";

export default function CreateArticleForm({ closeModal, reloadArticles }) {
  const [articleForm, setArticleForm] = useState({ title: "", content: "" });

  const onChangeText = (str, field) => {
    setArticleForm({ ...articleForm, [field]: str });
  };

  const onSubmit = () => {
    axios
      .post("http://192.168.1.17:3310/api/articles", articleForm)
      .then((res) => {
        reloadArticles();
        Toast.show({
          type: "success",
          text1: "Article créé avec succès",
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
        Nouvel Article
      </Text>
      <Text>Titre</Text>
      <TextInput
        editable
        maxLength={150}
        onChangeText={(str) => onChangeText(str, "title")}
        value={articleForm.title}
        style={styles.input}
      />
      <Text>Contenu</Text>
      <TextInput
        editable
        multiline
        maxLength={1000}
        onChangeText={(str) => onChangeText(str, "content")}
        value={articleForm.content}
        style={styles.inputArea}
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
    width: "80%",
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  inputArea: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    height: 300,
    width: "80%",
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    textAlignVertical: "top",
  },
});
