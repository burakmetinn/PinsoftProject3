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
  const [users, setUsers] = useState([
    {
      mail: "cekicengiz01@gmail.com",
      password: "123123",
      statu: "user",
      admin: "burak",
      starting: "2023/12/12",
      izinler: [
        {
          date: "11/08/2023",
          dateend: "13/08/2023",
          statu: "onaylandı",
        },
        {
          date: "15/08/2023",
          dateend: "15/08/2023",
          statu: "onaylanmadı",
        },
        {
          date: "16/08/2023",
          dateend: "18/08/2023",
          statu: "bekliyor",
        },
      ],
    },
    {
      mail: "elif@gmail.com",
      password: "123123",
      statu: "user",
      admin: "burak",
      starting: "2023/12/12",
    },
    {
      mail: "burak@gmail.com",
      password: "123123",
      statu: "admin", // Corrected property name here
      users: "utku, aylin, elif",
    },
  ]);

  console.log(users);

  const checkTextInput = () => {
    if (!textInputEmail.trim()) {
      Alert.alert("Error", "Please enter email.");
    } else if (!textInputPwd.trim()) {
      Alert.alert("Error", "Please enter password.");
    } else {
      const user = users.find(
        (u) => u.mail === textInputEmail && u.password === textInputPwd
      );

      if (user) {
        if (user.statu === "admin") {
          navigation.navigate("TabsManager");
        } else if (user.statu === "user") {
          navigation.navigate("TabsEmployee");
        } else {
          Alert.alert("Error", "Invalid user status.");
        }
      } else {
        Alert.alert("Error", "Invalid email or password.");
      }
    }
  };

  const pwd = useRef();
  return (
    <ScrollView keyboardShouldPersistTaps="handled" style={styles.scroll}>
      <View style={styles.view}>
        <View>
          <Image
            style={{
              width: 300,
              height: 250,
              marginRight: 145,
              left: 65,
              top: 130,
              marginBottom: 70,
            }}
            source={require("../assets/headerLogo.png")}
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
              secureTextEntry={hidePass ? true : false}
              onChangeText={(value) => setTextInputPwd(value)}
            />
            <TouchableOpacity style={styles.lockButton}>
              <Entypo
                name={hidePass ? "lock" : "lock-open"}
                style={styles.lockBtn}
                onPress={() => {
                  setHidePass(!hidePass);
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.btn}>
          <TouchableOpacity
            onPress={checkTextInput}
            hitSlop={{ left: 100, right: 100, top: 20, bottom: 20 }}
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
    backgroundColor: "#0f396b",
  },
  btnText: {
    color: "white",
    fontSize: 16,
  },
  button: {
    fontSize: 120,
  },
  btnText2: {
    paddingTop: 20,
    fontWeight: "bold",
  },
  lockBtn: {
    fontSize: 15,
    left: 195,
    bottom: 7,
    color: "#999999",
    width: 20,
    marginLeft: 0,
    padding: 0,
  },
  lockButton: {
    width: 20,
  },
});

export default LoginScreen;
