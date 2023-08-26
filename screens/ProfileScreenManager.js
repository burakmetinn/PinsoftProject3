import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addLogin, addUser } from "../app/dataSlice";

const ProfileScreenManager = ({ navigation }) => {
  const [isSheetVisible, setSheetVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Name 1");
  const login = useSelector((state) => state.data.login);

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

  const handleLogout = () => {
    dispatch(addLogin({}));
    dispatch(addUser({}));
    navigation.navigate("LoginScreen");
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoSection}>
        <Ionicons name="person-circle" color="white" size={100} />
        <Text style={styles.sampleName}>
          {email} {lastName}
        </Text>
      </View>

      <Text style={styles.email}>Email Address : {email}</Text>
      <Text style={styles.email2}>Role : {role}</Text>

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
            <Ionicons name="person-circle" size={30} color="white" />
            <Text style={styles.sectionTitle}>Select New Manager</Text>
          </TouchableOpacity>
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
    alignItems: "center",
    paddingTop: 20,
    backgroundColor: "#0A2647",
  },
  infoSection: {
    marginTop: 5,
    marginBottom: 10,
    flexDirection: "column",
    alignItems: "center",
    ...Platform.select({
      web: {
        alignSelf: "flex-start",
        flexDirection: "row",
      },
    }),
  },
  sampleName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  nameInfo: {
    marginLeft: 10,
  },
  firstName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  lastName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  emailSection: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 20,
  },
  email: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
    alignSelf: "flex-start",
    flexDirection: "row",
    left: 12,
    marginTop: 50,
  },
  email2: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
    alignSelf: "flex-start",
    flexDirection: "row",
    left: 12,
    marginBottom: 15,
    top: 20,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  logOutContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    top: 50,
    ...Platform.select({
      web: {
        bottom: 50,
        left: 700,
      },
    }),
  },
  logOutText: {
    marginLeft: 10,
    color: "red",
    fontWeight: "bold",
    fontSize: 15,
  },
  optionsContainer: {
    marginTop: 30,
    marginLeft: 30,
    marginBottom: 20,
    right: 85,
    ...Platform.select({
      web: {
        right: 650,
      },
    }),
  },
  optionButton: {
    padding: 10,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 10,
    width: 240,
    justifyContent: "space-between",
    alignItems: "center",
  },
  managerText: {
    paddingRight: 90,
    paddingLeft: 10,
    color: "white",
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
  sectionTitle: {
    fontSize: 18,
    right: 10,
    color: "white",
  },
  sheetOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#dbdbdb",
  },

  selectManagerButton: {
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 15,
    color: "black",
    fontWeight: "bold",
  },
});

export default ProfileScreenManager;
