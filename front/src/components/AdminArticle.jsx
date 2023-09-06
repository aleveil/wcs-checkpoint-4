import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import MyModal from "./MyModal";
import PrimaryButton from "./PrimaryButton";
import axios from "axios";
import AdminArticleCard from "./AdminArticleCard";
import { MaterialIcons } from "@expo/vector-icons";
import MyFullModal from "./MyFullModal";
import CreateArticleForm from "./CreateArticleForm";
import Toast from "react-native-toast-message";

export default function AdminArticle() {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isDeleteArticleModalOpen, setIsDeleteArticleModalOpen] =
    useState(false);
  const [isCreateArticleModalOpen, setIsCreateArticleModalOpen] =
    useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    axios
      .get(`http://192.168.1.17:3310/api/articles`)
      .then((res) => {
        setArticles(res.data);
      })
      .catch((err) =>
        Toast.show({
          type: "error",
          text1: "Une erreur est survenue",
          text2: "Veuillez réessayer.",
        })
      );
  }, [reload]);

  const handleDelete = () => {
    axios
      .delete(`http://192.168.1.17:3310/api/articles/${selectedArticle.id}`)
      .then((res) => {
        setReload((p) => !p);
        setSelectedArticle(null);
        Toast.show({
          type: "success",
          text1: "Article supprimé avec succès",
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
    <View style={{ height: "100%" }}>
      <ScrollView>
        <View style={styles.container}>
          {articles.length > 0 &&
            articles
            .sort((a, b) => (a.id > b.id ? -1 : 1))
            .map((article) => (
              <AdminArticleCard
                key={article.id}
                article={article}
                onPressDelete={(article) => {
                  setSelectedArticle(article);
                  setIsDeleteArticleModalOpen(true);
                }}
              />
            ))}
        </View>
      </ScrollView>

      {selectedArticle && (
        <MyModal visible={isDeleteArticleModalOpen}>
          <View
            style={{ justifyContent: "center", alignItems: "center", gap: 20 }}
          >
            <Text>Voulez-vous vraiment supprimer cet article ?</Text>
            <Text style={{ fontWeight: "bold" }}>{selectedArticle.title}</Text>
            <View style={{ flexDirection: "row", gap: 50 }}>
              <PrimaryButton
                text="Annuler"
                onPress={() => setIsDeleteArticleModalOpen(false)}
              />
              <PrimaryButton
                text="Oui"
                onPress={() => {
                  handleDelete();
                  setIsDeleteArticleModalOpen(false);
                }}
              />
            </View>
          </View>
        </MyModal>
      )}

      <MyFullModal visible={isCreateArticleModalOpen}>
        <CreateArticleForm
          closeModal={() => setIsCreateArticleModalOpen(false)}
          reloadArticles={() => setReload((p) => !p)}
        />
      </MyFullModal>

      <Pressable
        style={styles.createButton}
        onPress={() => {
          setIsCreateArticleModalOpen(true);
        }}
      >
        <MaterialIcons name="add" size={35} color="white" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    paddingBottom: 150,
    gap: 20,
  },
  createButton: {
    position: "absolute",
    padding: 15,
    bottom: 25,
    right: 25,
    borderRadius: 100,
    backgroundColor: "#2AF",
  },
});
