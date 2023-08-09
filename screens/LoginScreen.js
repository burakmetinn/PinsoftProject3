import { View, Text, Button } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";

const LoginScreen = () => {
  return (
    <View style={styles.view}>
      <Text>LoginScreen</Text>
      <Button style={styles.button} title="LoginScreen" />
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