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
import axios from "axios";
import { useDispatch } from "react-redux";
import { addLogin } from "../app/dataSlice";

const LoginScreen = ({ navigation }) => {
  const [hidePass, setHidePass] = useState(true);
  const [textInputEmail, setTextInputEmail] = useState("");
  const [textInputPwd, setTextInputPwd] = useState("");

  const dispatch = useDispatch();

  const loginHandler = () => {
    axios
      .post("https://time-off-tracker-production.up.railway.app/auth/login", {
        email: textInputEmail,
        password: textInputPwd,
      })

      .then(
        (response) => {
          dispatch(addLogin(response.data));
          console.log(response.data.token);

          if (response.data.role === "EMPLOYEE") {
            navigation.navigate("SelectAdminScreen");
          } else if (response.data.role === "ADMIN") {
            navigation.navigate("TabsManager");
          }
        },

        (error) => {
          console.log(error);
          if (!textInputEmail.trim()) {
            Alert.alert("Error", "Please enter email!");
          } else if (!textInputPwd.trim()) {
            Alert.alert("Error", "Please enter password!");
          } else {
            Alert.alert("Error", "Make sure you entered the right parameters!");
          }
        }
      );
  };

  const pwd = useRef();
  return (
    <ScrollView keyboardShouldPersistTaps="handled" style={styles.scroll}>
      <View style={styles.view}>
        <View>
          <Image
            style={styles.img}
            source={require("../assets/headerLogo.png")}
          />
        </View>
        <View>
          <View style={styles.inputs}>
            <TextInput
              placeholder="Email"
              style={{
                top: 8,
                ...Platform.select({
                  web: {
                    outline: "none",
                  },
                }),
              }}
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
              style={{
                top: 9,
                ...Platform.select({
                  web: {
                    outline: "none",
                  },
                }),
              }}
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
       
        <TouchableOpacity
            style={styles.btn}
            activeOpacity={0.7}
            onPress={loginHandler}
            hitSlop={{ left: 100, right: 100, top: 20, bottom: 20 }}
          >
            <Text style={styles.btnText}>Log In</Text>
        </TouchableOpacity>
        
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
  img: {
    width: 300,
    height: 250,
    top: 130,
    marginBottom: 70,
    ...Platform.select({
      web: {
        top: 80,
      },
    }),
  },
  inputs: {
    width: 250,
    backgroundColor: "#ebeff2",
    borderRadius: 20,
    height: 60,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,

    ...Platform.select({
      web: {
        bottom: 50,
      },
    }),
  },
  ins: {
    top: 9,
    ...Platform.select({
      web: {
        outlineStyle: "none",
        paddingTop: 15,
      },
    }),
  },

  btn: {
    padding: 20,
    backgroundColor: "#e1e5e8",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    width: 247,
    backgroundColor: "#0f396b",
    ...Platform.select({
      web: {
        bottom: 50,
      },
    }),
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
    ...Platform.select({
      web: {
        bottom: 50,
      },
    }),
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
