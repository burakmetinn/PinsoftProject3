import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ProfileScreenManager = ({ navigation }) => {
  const handleLogout = () => {
    navigation.navigate("LoginScreen");
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoSection}>
        <Ionicons name="person-circle" color="white" size={100} />
        <Text style={styles.sampleName}>Firstname Lastname</Text>
      </View>

      <View style={styles.newM}>
        <TouchableOpacity>
          <Text style={styles.new}>Select New Manager</Text>
        </TouchableOpacity>
      </View>

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
  sectionTitle: {
    fontSize: 20,
    marginBottom: 5,
  },
  sampleName: {
    fontSize: 20,
    paddingLeft: 10,
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },

  logOutContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    marginLeft: 30,
    marginTop: 380,
    width: 120,
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
