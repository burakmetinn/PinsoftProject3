import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUp";
import HomeScreen from "../screens/HomeScreen";
import TabsManager from "./TabsManager";
import TabsEmployee from "./TabsEmployee";
import ProfileScreen from "../screens/ProfileScreenEmployee";
import { HeaderBackButton } from "@react-navigation/elements";
import {
  Image,
  TouchableOpacity,
  View,
  StyleSheet,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SelectAdminScreen from "../screens/SelectAdminScreen";

const Stacks = () => {
  const headerManager = (
    <View style={styles.header}>
      <Image
        style={styles.logo}
        source={require("../assets/headerLogoManager.png")}
      />
    </View>
  );
  const headerEmployee = (
    <View style={styles.header}>
      <Image style={styles.logo} source={require("../assets/headerLogo.png")} />
    </View>
  );

  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{
          headerTitle: "",
          headerBackTitle: "Log In",
          headerTintColor: "black",
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="TabsManager"
        component={TabsManager}
        options={{
          header: () => headerManager,
          headerLeft: null,
        }}
      />
      <Stack.Screen
        name="TabsEmployee"
        component={TabsEmployee}
        options={{
          header: () => headerEmployee,
          headerLeft: null,
        }}
      />
      <Stack.Screen
        name="SelectAdminScreen"
        component={SelectAdminScreen}
        options={{
          headerTitle: "",
          headerBackTitle: "Back",
          headerTintColor: "black",
          headerShadowVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: Platform.OS === "web" ? "flex-start" : "center",
  },

  logo: {
    width: 200,
    height: 80,
    bottom: 10,
    top: 25,
    marginBottom: 10,
    marginRight: 10,
    ...Platform.select({
      web: {
        top: 5,
        height: 100,
        width: 250,
        bottom: 0,
        marginBottom: 0,
      },
    }),
  },
});

export default Stacks;
