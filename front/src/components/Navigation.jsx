import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Login from "./Login";
import Register from "./Register";
import Toast from "react-native-toast-message";
import { useUserContext } from "../contexts/UserContext";
import MyModal from "./MyModal";
import { useState } from "react";
import PrimaryButton from "./PrimaryButton";
import Articles from "./Articles";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Admin from "./Admin";

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
          <Tab.Screen
            name="Articles"
            component={Articles}
            options={{
              tabBarIcon: (info) => (
                <MaterialIcons name="article" size={24} color={info.color} />
              ),
            }}
          />
          <Tab.Screen
            name="Favoris"
            
            options={{
              tabBarIcon: (info) => (
                <AntDesign name="heart" size={24} color={info.color} />
              ),
            }}
          >
            {(props) => <Articles  onlyFavorites={true} />}
          </Tab.Screen>
          {!!user.is_admin && (
            <Tab.Screen
              name="Administration"
              component={Admin}
              options={{
                tabBarIcon: (info) => (
                  <MaterialIcons
                    name="admin-panel-settings"
                    size={24}
                    color={info.color}
                  />
                ),
              }}
            />
          )}
          <Tab.Screen
            name="Déconnexion"
            component={Login}
            options={{
              tabBarIcon: (info) => (
                <MaterialIcons name="logout" size={24} color={info.color} />
              ),
            }}
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
          <Tab.Screen
            name="Se Connecter"
            component={Login}
            options={{
              tabBarIcon: (info) => (
                <MaterialIcons name="login" size={24} color={info.color} />
              ),
            }}
          />
          <Tab.Screen
            name="S'inscrire"
            component={Register}
            options={{
              tabBarIcon: (info) => (
                <MaterialCommunityIcons
                  name="account-plus"
                  size={24}
                  color={info.color}
                />
              ),
            }}
          />
        </Tab.Navigator>
      )}
      <MyModal visible={isLogoutModalOpen}>
        <View
          style={{ justifyContent: "center", alignItems: "center", gap: 60 }}
        >
          <Text>Voulez-vous vraiment vous déconnecter ?</Text>
          <View style={{ flexDirection: "row", gap: 50 }}>
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
          </View>
        </View>
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
