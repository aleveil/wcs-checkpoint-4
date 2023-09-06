import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function AdminUserCard({ user, onPressDelete }) {
  return (
    <View style={styles.container}>
      <View style={styles.textArea}>
        {user.is_admin ? (
          <MaterialIcons name="verified-user" size={24} color="black" />
        ) : (
          <MaterialCommunityIcons name="account" size={24} color="black" />
        )}
        <Text style={styles.email}>{user.email}</Text>
      </View>
      <Pressable onPress={() => onPressDelete(user)} style={{ padding: 10 }}>
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
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "80%",
    gap: 10,
  },
  email: {
    fontWeight: "bold",
  },
});
