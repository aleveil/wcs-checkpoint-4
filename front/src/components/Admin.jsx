import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text } from "react-native";
import AdminUser from "./AdminUser";
import AdminArticle from "./AdminArticle";

const Tab = createBottomTabNavigator();

export default function Admin() {
  return (
    <NavigationContainer independent>
      <Tab.Navigator>
        <Tab.Screen
          name="Utilisateurs"
          component={AdminUser}
          options={{
            tabBarIcon: (info) => (
              <MaterialCommunityIcons
                name="account"
                size={24}
                color={info.color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Articles"
          component={AdminArticle}
          options={{
            tabBarIcon: (info) => (
              <MaterialIcons name="article" size={24} color={info.color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
