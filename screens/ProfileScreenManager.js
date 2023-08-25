import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ProfileScreenManager = ({ navigation }) => {
  const [role, setRole] = useState("user");

  const user = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
  };

  const makeManager = () => {
    setRole("manager");
  };

  const handleLogout = () => {
    navigation.navigate("LoginScreen");
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoSection}>
        <Ionicons name="person-circle" color="white" size={100} />
        <View style={styles.nameInfo}>
          <Text style={styles.firstName}>{user.firstName}</Text>
          <Text style={styles.lastName}>{user.lastName}</Text>
        </View>
      </View>

      <View style={styles.emailSection}>
        <Ionicons name="mail-outline" size={25} color="gray" />
        <Text style={styles.email}>{user.email}</Text>
      </View>

      {role === "user" && (
        <TouchableOpacity onPress={makeManager} style={styles.newM}>
          <Text style={styles.new}>Select New Manager</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={handleLogout} style={styles.logOutContainer}>
        <Ionicons name="log-out-outline" size={25} color="red" />
        <Text style={styles.logOutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: 20,
    backgroundColor: "#0A2647",
  },
  infoSection: {
    marginTop: 5,
    marginBottom: 20,
    flexDirection: "row",
    marginLeft: 20,
    alignItems: "center",
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
    marginLeft: 20,
    marginBottom: 20,
  },
  email: {
    fontSize: 18,
    marginLeft: 10,
    color: "gray",
  },
  logOutContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    marginLeft: 30,
  },
  logOutText: {
    marginLeft: 10,
    color: "red",
    fontWeight: "bold",
    fontSize: 15,
  },
  newM: {
    top: 50,
    left: 30,
    marginBottom: 10,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 20,
    width: 182,
    justifyContent: "center",
    alignItems: "center",
  },
  new: {
    fontSize: 15,
    color: "black",
  },
});

export default ProfileScreenManager;
