import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";

const SignUpScreen = ({ navigation }) => {
  return (
    <View style={styles.view}>
      <Text style={styles.logo}>Sign Up</Text>
      <View>
        <View style={styles.inputs}>
          <TextInput placeholder="Name" style={{ top: 9 }} />
          <Ionicons
            name="person"
            style={{ fontSize: 15, left: 195, bottom: 7, color: "#999999" }}
          />
        </View>
        <View style={styles.inputs}>
          <TextInput placeholder="Email" style={{ top: 9 }} />
          <Feather
            name="mail"
            style={{ fontSize: 15, left: 195, bottom: 7, color: "#999999" }}
          />
        </View>
        <View style={styles.inputs}>
          <TextInput placeholder="Password" secureTextEntry={true} />
        </View>
        <View style={styles.inputs}>
          <TextInput placeholder="Confirm Password" secureTextEntry={true} />
        </View>
      </View>
      <View style={styles.btn}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Tabs");
          }}
        >
          <Text style={styles.btnText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("LoginScreen");
        }}
      >
        <Text style={styles.btnText2}>Already have an account? Log In.</Text>
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
    color: "black",
    marginTop: 60,
    marginBottom: 50,
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

export default SignUpScreen;
