import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.view}>
      <Text style={styles.logo}>Time Off</Text>
      <View>
        <Image
          style={{
            width: 70,
            height: 50,
            marginRight: 145,
            bottom: 45,
            transform: [{ rotate: "300deg" }],
          }}
          source={require("../assets/sun.png")}
        />
      </View>
      <View>
        <View style={styles.inputs}>
          <TextInput placeholder="Email" style={{top:10}} />
          <Ionicons name="person-circle-outline" style={{fontSize:20, left:190, bottom:10}} />
        </View>
        <View style={styles.inputs}>
          <TextInput placeholder="Password" />
        </View>
      </View>
      <View style={styles.btn}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Tabs");
          }}
        >
          <Text style={styles.btnText}>Log In</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("SignUpScreen");
        }}
      >
        <Text style={styles.btnText2}>Don't have an account? Sign Up.</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  logo: {
    fontWeight: "bold",
    fontSize: 30,
    width: 115,
    color: "black",
    marginTop: 200,
    fontFamily: "Cochin-BoldItalic",
  },
  inputs: {
    width: 250,
    backgroundColor: "#ebeff2",
    borderRadius: 20,
    height: 60,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  btn: {
    padding: 20,
    backgroundColor: "#e1e5e8",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    width: 247,
  },
  btnText: {
    fontWeight: "bold",
  },
  button: {
    fontSize: 120,
  },
  btnText2: {
    paddingTop: 15,
    fontWeight: "bold",
  },
});

export default LoginScreen;
