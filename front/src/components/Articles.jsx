import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import ArticleCard from "./ArticleCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUserContext } from "../contexts/UserContext";
import { useIsFocused } from "@react-navigation/native";
import MyFullModal from "./MyFullModal";
import { AntDesign } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

export default function Articles({ onlyFavorites }) {
  const [articles, setArticles] = useState([]);
  const [user, setUser] = useUserContext();
  const [reload, setReload] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const isFocused = useIsFocused();

  useEffect(() => {
    axios
      .get(`http://192.168.1.17:3310/api/favarticles/${user.id}`)
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
  }, [reload, isFocused]);

  return (
    <View>
      <ScrollView>
        <View style={styles.container}>
          {articles.filter((article) =>
            onlyFavorites ? article.is_favorite : true
          ).length !== 0 ? (
            articles
              .filter((article) => (onlyFavorites ? article.is_favorite : true))
              .sort((a, b) => (a.id > b.id ? -1 : 1))
              .map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  setSelectedArticle={setSelectedArticle}
                  reloadArticles={() => setReload((p) => !p)}
                />
              ))
          ) : (
            <Text>
              {onlyFavorites
                ? "Vous n'avez pas d'articles favoris :("
                : "Il n'y a pas d'articles à afficher :("}
            </Text>
          )}
        </View>
      </ScrollView>
      {selectedArticle && (
        <MyFullModal visible={!!selectedArticle}>
          <ScrollView>
            <View style={{ alignItems: "center", paddingBottom: 150 }}>
              <Text style={styles.title}>{selectedArticle.title}</Text>
              <Text style={styles.content}>{selectedArticle.content}</Text>
            </View>
          </ScrollView>
          <Pressable
            style={styles.backButton}
            onPress={() => {
              setSelectedArticle(null);
            }}
          >
            <AntDesign name="arrowleft" size={35} color="white" />
          </Pressable>
        </MyFullModal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    gap: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
  },
  content: {
    marginHorizontal: 30,
    textAlign: "justify",
  },
  backButton: {
    position: "absolute",
    padding: 15,
    bottom: 25,
    right: 25,
    borderRadius: 100,
    backgroundColor: "#2AF",
  },
});
