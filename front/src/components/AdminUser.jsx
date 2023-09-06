import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import MyModal from "./MyModal";
import PrimaryButton from "./PrimaryButton";
import axios from "axios";
import AdminUserCard from "./AdminUserCard";
import MyFullModal from "./MyFullModal";
import CreateUserForm from "./CreateUserForm";
import { MaterialIcons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

export default function AdminUser() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDeleteUserModalOpen, setIsDeleteUserModalOpen] = useState(false);
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    axios
      .get(`http://192.168.1.17:3310/api/users`)
      .then((res) => {
        setUsers(res.data);
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
      .delete(`http://192.168.1.17:3310/api/users/${selectedUser.id}`)
      .then((res) => {
        setReload((p) => !p);
        setSelectedUser(null);
        Toast.show({
          type: "success",
          text1: "Utilisateur supprimé avec succès",
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
          {users.length > 0 &&
            users
              .sort((a, b) => (a.email < b.email ? -1 : 1))
              .sort((a, b) => (a.is_admin > b.is_admin ? -1 : 1))
              .map((user) => (
                <AdminUserCard
                  key={user.id}
                  user={user}
                  onPressDelete={(user) => {
                    setSelectedUser(user);
                    setIsDeleteUserModalOpen(true);
                  }}
                />
              ))}
        </View>
      </ScrollView>
      {selectedUser && (
        <MyModal visible={isDeleteUserModalOpen}>
          <View
            style={{ justifyContent: "center", alignItems: "center", gap: 20 }}
          >
            <Text>Voulez-vous vraiment supprimer cet utilisateur ?</Text>
            <Text style={{ fontWeight: "bold" }}>{selectedUser.email}</Text>
            <View style={{ flexDirection: "row", gap: 50 }}>
              <PrimaryButton
                text="Annuler"
                onPress={() => setIsDeleteUserModalOpen(false)}
              />
              <PrimaryButton
                text="Oui"
                onPress={() => {
                  handleDelete();
                  setIsDeleteUserModalOpen(false);
                }}
              />
            </View>
          </View>
        </MyModal>
      )}

      <MyFullModal visible={isCreateUserModalOpen}>
        <CreateUserForm
          closeModal={() => setIsCreateUserModalOpen(false)}
          reloadUsers={() => setReload((p) => !p)}
        />
      </MyFullModal>

      <Pressable
        style={styles.createButton}
        onPress={() => {
          setIsCreateUserModalOpen(true);
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
