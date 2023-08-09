import { View, Text, Button } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.view}>
      <Text>LoginScreen</Text>
      <Button
        style={styles.button}
        title="LoginScreen"
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
