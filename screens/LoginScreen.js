import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import React, { useRef, useState } from "react";
import { StyleSheet } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import Entypo from "react-native-vector-icons/Entypo";

const LoginScreen = ({ navigation }) => {
  const [hidePass, setHidePass] = useState(true);
  const [textInputEmail, setTextInputEmail] = useState("");
  const [textInputPwd, setTextInputPwd] = useState("");

  const checkTextInput = () => {
    if (!textInputEmail.trim()) {
      Alert.alert("Error", "Please enter email.");
      return;
    }
    if (!textInputPwd.trim()) {
      Alert.alert("Error", "Please enter password.");
      return;
    }
    navigation.navigate("Tabs");
  };
  const pwd = useRef();
  return (
    <ScrollView keyboardShouldPersistTaps="handled" style={styles.scroll}>
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
            <TextInput
              placeholder="Email"
              style={{ top: 8 }}
              returnKeyType="next"
              onSubmitEditing={() => {
                pwd.current.focus();
              }}
              blurOnSubmit={false}
              onChangeText={(value) => setTextInputEmail(value)}
            />
            <Feather
              name="mail"
              style={{ fontSize: 15, left: 195, bottom: 7, color: "#999999" }}
            />
          </View>
          <View style={styles.inputs}>
            <TextInput
              placeholder="Password"
              style={{ top: 9 }}
              ref={pwd}
              secureTextEntry={hidePass ? "true" : "false"}
              onChangeText={(value) => setTextInputPwd(value)}
            />
            <TouchableOpacity
              onPress={() => {
                setHidePass(!hidePass);
              }}
            >
              <Entypo
                name={hidePass ? "lock" : "lock-open"}
                style={{ fontSize: 15, left: 195, bottom: 7, color: "#999999" }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.btn}>
          <TouchableOpacity
            onPress={checkTextInput}
            hitSlop={{ left: "100", right: "100", top: "20", bottom: "20" }}
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  scroll: {
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
