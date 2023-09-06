import { Pressable, StyleSheet, Text, View } from "react-native";
import stringHelper from "../services/stringHelper";
import { AntDesign } from "@expo/vector-icons";
import { useUserContext } from "../contexts/UserContext";
import axios from "axios";
import Toast from "react-native-toast-message";

export default function ArticleCard({
  article,
  setSelectedArticle,
  reloadArticles,
}) {
  const [user, setUser] = useUserContext();

  const handleToggleFavorite = () => {
    if (article.is_favorite) {
      axios
        .delete(
          `http://192.168.1.17:3310/api/favorites/${article.id}/${user.id}`
        )
        .then((res) => {
          reloadArticles();
        })
        .catch((err) =>
          Toast.show({
            type: "error",
            text1: "Une erreur est survenue",
            text2: "Veuillez réessayer.",
          })
        );
    } else {
      axios
        .post(`http://192.168.1.17:3310/api/favorites`, {
          user_id: user.id,
          article_id: article.id,
        })
        .then((res) => {
          reloadArticles();
        })
        .catch((err) =>
          Toast.show({
            type: "error",
            text1: "Une erreur est survenue",
            text2: "Veuillez réessayer.",
          })
        );
    }
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.textArea}
        onPress={() => setSelectedArticle(article)}
      >
        <Text style={styles.title}>{article.title}</Text>
        <Text style={styles.content}>
          {stringHelper.stringLimiter(article.content)}
        </Text>
      </Pressable>
      <Pressable onPress={handleToggleFavorite} style={{ padding: 10 }}>
        <AntDesign
          name={article.is_favorite ? "heart" : "hearto"}
          size={30}
          color="red"
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 5,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  textArea: {
    width: "80%",
  },
  title: {
    fontWeight: "bold",
  },
});
