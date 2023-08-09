import { View, Text, Button } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";

const SignUpScreen = () => {
  return (
    <View style={styles.view}>
      <Text>SignUpScreen</Text>
      <Button style={styles.button} title="SignUpScreen" />
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