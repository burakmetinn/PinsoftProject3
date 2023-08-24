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
        <Ionicons name="person-circle" size={100} />
        <Text style={styles.sampleName}>Firstname Lastname</Text>
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
    backgroundColor: "#0f396b",
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
  },

  logOutContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    marginLeft: 30,
    marginTop: 50,
    width: 120,
  },
  logOutText: {
    marginLeft: 10,
    color: "red",
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default ProfileScreenManager;
