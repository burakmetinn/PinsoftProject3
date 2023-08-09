import { View, Text, Button } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";

const SignUpScreen = () => {
  return (
    <View style={styles.view}>
      <Text>Create an acoount</Text>
      <Button style={styles.button} title="Sign Up" />
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

export default SignUpScreen;