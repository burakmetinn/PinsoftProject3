import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUp";
import HomeScreen from "../screens/HomeScreen";
import TabsManager from "./TabsManager";
import TabsEmployee from "./TabsEmployee";
import ProfileScreen from "../screens/ProfileScreenEmployee";
import { HeaderBackButton } from "@react-navigation/elements";
import { Image, TouchableOpacity, View, StyleSheet, Platform } from "react-native";
import { Ionicons } from '@expo/vector-icons';




const Stacks = () => {

  const headerManager = (
    <View style={styles.header}>
  <TouchableOpacity>
    <Ionicons name="reorder-three-outline" size={30} style={styles.menuIcon}/>
  </TouchableOpacity>
    <Image  style={styles.logo}    source={require('../assets/headerLogoManager.png')}  />
    {/* <Ionicons name="person-circle"   size={30} color={"#bd2d2d"} style={{left: 80 ,top: 45, alignItems: 'center', justifyContent: 'center'}}></Ionicons> */}
    </View>
  )
  const headerEmployee = (
    <View style={styles.header}>
  <TouchableOpacity>
    <Ionicons name="reorder-three-outline" size={30} style={styles.menuIcon}/>
  </TouchableOpacity>
    <Image  style={styles.logo}    source={require('../assets/headerLogo.png')}  />
    {/* <Ionicons name="person-circle"   size={30} color={"black"} style={{left: 80 ,top: 45, alignItems: 'center', justifyContent: 'center'}}></Ionicons>  */}
    </View>
  )

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
          header: ()=> headerManager,
          headerLeft: null,
        }}
      />
      <Stack.Screen
        name="TabsEmployee"
        component={TabsEmployee}
        options={{ 
          header: ()=> headerEmployee,
          headerLeft: null 
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection:"row",
  },

  logo: {
    width: 200,
    height: 80,
    bottom: 10,
    left: 45,
    top:25, 
    marginBottom: 10,
    ...Platform.select({
      web: {
        top: 10,
        height: 100,
        width: 250,
        bottom: 0,
        marginBottom: 0,
      },
    }),
  },

  menuIcon: {
    left: 15,
    top: 45,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      web: {
        left: 25,
        top: 40,
        fontSize: 35,
      },
    }),
  },
  
});

export default Stacks;
