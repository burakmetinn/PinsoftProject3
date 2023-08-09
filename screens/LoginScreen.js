import { View, Text, Button } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.view}>
      <Text>LoginScreen</Text>
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
    justifyContent: "center",
  },
});

export default LoginScreen;
