import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";

const SignUpScreen = () => {
  return (
    <View style={styles.view}>
      <Text style={styles.logo}>Sign Up</Text>
      <View>
        <View style={styles.inputs}>
          <TextInput placeholder="Email" />
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
    marginTop: 115,
    marginBottom:50,
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
