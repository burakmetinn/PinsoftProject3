import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUp";
import HomeScreen from "../screens/HomeScreen";
import TabsManager from "./TabsManager";
import TabsEmployee from "./TabsEmployee";
import ProfileScreen from "../screens/ProfileScreenEmployee";
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
          headerBackTitle: "Log In",
          headerTintColor: "black",
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="TabsManager"
        component={TabsManager}
        options={{
          headerTitle: "Time Off",
          headerLeft: null,
        }}
      />
      <Stack.Screen
        name="TabsEmployee"
        component={TabsEmployee}
        options={{ headerTitle: "Time Off", headerLeft: null }}
      />
    </Stack.Navigator>
  );
};

export default Stacks;
