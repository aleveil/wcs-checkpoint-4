import { StyleSheet, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Login from "./Login";
import Register from "./Register";
import Toast from "react-native-toast-message";
import { useUserContext } from "../contexts/UserContext";
import MyModal from "./MyModal";
import { useState } from "react";
import PrimaryButton from "./PrimaryButton";

const Tab = createBottomTabNavigator();

export default function Navigation() {
  const [user, setUser] = useUserContext();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const logout = () => {
    setUser(null);
  };

  return (
    <NavigationContainer>
      {user ? (
        <Tab.Navigator>
          <Tab.Screen name="Articles" component={() => <Text>Articles</Text>} />
          <Tab.Screen name="Favoris" component={() => <Text>Favoris</Text>} />
          {!!user.is_admin && (
            <Tab.Screen
              name="Administration"
              component={() => <Text>Administration</Text>}
            />
          )}
          <Tab.Screen
            name="Déconnexion"
            component={Login}
            listeners={{
              tabPress: (e) => {
                e.preventDefault();
                setIsLogoutModalOpen(true);
              },
            }}
          />
        </Tab.Navigator>
      ) : (
        <Tab.Navigator>
          <Tab.Screen name="Se Connecter" component={Login} />
          <Tab.Screen name="S'inscrire" component={Register} />
        </Tab.Navigator>
      )}
      <MyModal visible={isLogoutModalOpen}>
        <Text>Voulez-vous vraiment vous déconnecter ?</Text>
        <PrimaryButton
          text="Annuler"
          onPress={() => setIsLogoutModalOpen(false)}
        />
        <PrimaryButton
          text="Oui"
          onPress={() => {
            setIsLogoutModalOpen(false);
            logout();
          }}
        />
      </MyModal>
      <Toast />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
