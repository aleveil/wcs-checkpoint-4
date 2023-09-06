import { Pressable, StyleSheet, Text, View } from "react-native";
import stringHelper from "../services/stringHelper";
import { MaterialIcons } from "@expo/vector-icons";

export default function AdminArticleCard({ article, onPressDelete }) {

  return (
    <View style={styles.container}>
      <Pressable style={styles.textArea}>
        <Text style={styles.title}>{article.title}</Text>
        <Text style={styles.content}>
          {stringHelper.stringLimiter(article.content)}
        </Text>
      </Pressable>
      <Pressable onPress={() => onPressDelete(article)} style={{ padding: 10}}>
        <MaterialIcons name="delete-forever" size={30} color="black" />
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
