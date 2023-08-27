import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Switch,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addLogin, addUser } from "../app/dataSlice";
import { useThemeContext } from "../../ThemeContext";

const ProfileScreenManager = ({ navigation }) => {
  const [isSheetVisible, setSheetVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Name 1");
  const login = useSelector((state) => state.data.login);
  const { isDarkModeOn, toggleSwitch } = useThemeContext();

  const token = login.token;
  const dispatch = useDispatch();

  const user = useSelector((state) => state.data.user);
  const firstName = user.firstName;
  const lastName = user.lastName;
  const email = user.email;
  const role = user.role;
  useEffect(() => {
    axios
      .get("https://time-off-tracker-production.up.railway.app/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(
        (response) => {
          dispatch(addUser(response.data));
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  const makeManager = () => {
    setRole("manager");
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setSheetVisible(false);
  };

  const handleLogout = () => {
    dispatch(addLogin({}));
    dispatch(addUser({}));
    navigation.navigate("LoginScreen");
  };
  const textColor = isDarkModeOn ? "white" : "black";

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkModeOn ? "#171d2b" : "#f2f2f2" },
      ]}
    >
      <View style={styles.infoSection}>
        <Ionicons name="person-circle" color={textColor} size={100} />
        <Text style={[styles.sampleName, { color: textColor }]}>
          {email} {lastName}
        </Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={[styles.sampleInfoTitle, { color: textColor }]}>
          Email Address
        </Text>
        <Text style={[styles.sampleInfo, { color: textColor }]}>{email}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={[styles.sampleInfoTitle, { color: textColor }]}>Role</Text>
        <Text style={[styles.sampleInfo, { color: textColor }]}>{role}</Text>
      </View>

      <View style={styles.buttonContainer}>
        {role === "user" && (
          <TouchableOpacity
            onPress={makeManager}
            style={styles.selectManagerButton}
          >
            <Text style={styles.buttonText}>Select Manager</Text>
          </TouchableOpacity>
        )}

        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => {
              navigation.navigate("NewManager");
            }}
          >
            <Ionicons
              name="person-circle"
              size={30}
              style={{ color: textColor }}
            />
            <Text style={[styles.optionsTitle, { color: textColor }]}>
              Select New Manager
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.darkMode}>
          <Text style={{ color: textColor, fontWeight: "bold", fontSize: 16 }}>
            Dark Mode{" "}
          </Text>
          <Switch value={isDarkModeOn} onValueChange={toggleSwitch}></Switch>
        </View>

        <TouchableOpacity onPress={handleLogout} style={styles.logOutContainer}>
          <Ionicons name="log-out-outline" size={25} color="red" />
          <Text style={styles.logOutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: 10,
    backgroundColor: "#0A2647",
  },
  infoSection: {
    marginTop: 5,
    marginBottom: 25,
    marginLeft: 20,
    flexDirection: "row",
    alignItems: "center",
    ...Platform.select({
      web: {
        alignSelf: "flex-start",
        flexDirection: "row",
      },
    }),
  },
  optionsTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
    left: 3,
  },

  sampleName: {
    fontSize: 20,
    paddingLeft: 10,
    fontWeight: "bold",
    color: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  sampleInfoTitle: {
    fontSize: 17,
    color: "white",
    alignSelf: "flex-start",
    flexDirection: "row",
    fontWeight: "bold",
  },

  sampleInfo: {
    fontSize: 15,
    color: "white",
    alignSelf: "flex-start",
    flexDirection: "row",
    marginBottom: 30,
    top: 5,
  },

  infoContainer: {
    marginLeft: 30,
    marginBottom: 15,
  },

  optionsContainer: {
    marginLeft: 30,
    marginBottom: 20,
    ...Platform.select({
      web: {
        right: 650,
      },
    }),
  },
  optionButton: {
    padding: 5,
    paddingLeft: 10,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 5,
    width: 220,
    alignItems: "center",
  },

  managerText: {
    paddingRight: 90,
    paddingLeft: 10,
    color: "white",
  },

  containerBg: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: 10,
  },

  bottomSheet: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 12,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  closeButton: {
    alignSelf: "center",
    marginBottom: 20,
  },
  sheetOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#dbdbdb",
  },

  logOutContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    marginLeft: 30,
    marginTop: 50,
    width: 120,
    ...Platform.select({
      web: {
        bottom: 480,
        left: 1380,
      },
    }),
  },
  logOutText: {
    marginLeft: 10,
    color: "red",
    fontWeight: "bold",
    fontSize: 15,
  },

  darkMode: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 30,
  },
});

export default ProfileScreenManager;
