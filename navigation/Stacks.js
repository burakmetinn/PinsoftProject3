import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUp";
import HomeScreen from "../screens/HomeScreen";
import Tabs from "./Tabs";
import ProfileScreen from "../screens/ProfileScreen";
import { HeaderBackButton } from "@react-navigation/elements";
const Stacks = () => {
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
          headerBackTitle:"Log In",
          headerTintColor: "black",
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="Tabs"
        component={Tabs}
        options={{
          headerTitle: "",
          headerTintColor: "black",
          headerShadowVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default Stacks;
