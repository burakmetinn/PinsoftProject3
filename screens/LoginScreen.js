import { View, Text, Button, TextInput } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.view}>
      <Text style={styles.logo}>Time Off</Text>
      <View>
        <View style={styles.inputs}>
          <TextInput placeholder="Email" />
        </View>
        <View>
          <TextInput style={styles.inputs} placeholder="Password" />
        </View>
      </View>
      <Button
        title="Log in"
        onPress={() => {
          navigation.navigate("Tabs");
        }}
      />
      <Button
        style={styles.button}
        title="Don't have an account? Click to sign up"
        onPress={() => {
          navigation.navigate("SignUpScreen");
        }}
      />
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
    marginBottom: 50,
    marginTop: 120,
  },
  inputs: {
    width: 250,
    backgroundColor: "#ebe8e8",
    borderRadius: 20,
    height: 60,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
});

export default LoginScreen;
