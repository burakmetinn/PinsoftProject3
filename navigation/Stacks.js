import { NavigationContainer, useNavigation } from "@react-navigation/native";
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
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SelectAdminScreen from "../screens/SelectAdminScreen";
import { useThemeContext } from "../ThemeContext";

const Stacks = () => {
 
  const { isDarkModeOn, toggleSwitch } = useThemeContext();
  const textColor = isDarkModeOn ? 'white' : 'black';

  const headerManager = (
    <View style={[styles.header,  {backgroundColor: isDarkModeOn? '#171d2b' :'white'}]}>
      <Image
        style={styles.logo}
        source={
          isDarkModeOn
            ? require("../assets/headerLogoManagerWhite.png") : require("../assets/headerLogoManager.png")
        }
      />
    </View>
  );
  const headerEmployee = (
    <View style={[styles.header,  {backgroundColor: isDarkModeOn? '#171d2b' :'white'}]}>
      <Image style={styles.logo} 
      source={
          isDarkModeOn
            ? require("../assets/headerLogoWhite.png") : require("../assets/headerLogo.png")
        } />
    </View>
  );

  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();
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
          headerShown: false
          //headerTitle: "",
         // headerBackTitle: "Back",
          //headerTintColor: "black",
          //headerShadowVisible: false,
          /* headerLeft: (props) => (
            <HeaderBackButton
              {...props}
              onPress={() => {
                Alert.alert(
                  "Warning",
                  "The action you have taken will not be recorded.",
                  (onPress = () => navigation.navigate("SignUpScreen"))
                );
              }}
            />
          ),*/
        }}
      />
      <Stack.Screen
        name="Stacks"
        component={Stacks}
        options={{
          header: () => headerEmployee,
          headerLeft: null,
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: Platform.OS === "web" ? "flex-start" : "center",
    ...Platform.select({
      web: {
        height: 60,
      },
    }),
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
        top: 12,
        height: 60,
        width: 250,
        bottom: 0,
        marginBottom: 0,
      },
    }),
  },
});

export default Stacks;
