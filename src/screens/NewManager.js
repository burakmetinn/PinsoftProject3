import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { useThemeContext } from "../../ThemeContext";

const NewManager = ({navigation}) => {
  const [users, setUsers] = useState([]);
  const login = useSelector((state) => state.data.login);
  const textColor = isDarkModeOn ? "white" : "black";
  const { isDarkModeOn, toggleSwitch } = useThemeContext();

  const token = login.token;

  useEffect(() => {
    axios
      .get("https://time-off-tracker-production.up.railway.app/users/get-all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      .then(
        (response) => {
          const transformedData = response.data.map((user) => ({
            label: `${user.firstName} ${user.lastName}`,
            value: user.id,
          }));
          setUsers(transformedData);

          console.log(users);
        },
        (error) => {
          console.log(error);
          alert("Make sure you Selected Your manager");
        }
      );
  }, []);
  // <Ionicons name="person-circle" size={25} />

  const renderItem = ({ item }) => (
    <View>
      <TouchableOpacity style={styles.item}>
        <Text style={styles.text}>{item.label}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkModeOn ? "#171d2b" : "#f2f2f2" },
      ]}
    >
      <View style={styles.header}>
        <Text
          style={[styles.title, { color: isDarkModeOn ? "wihte" : "black" }]}
        >
          Selecet New Manager
        </Text>
      </View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        style={styles.flatList}
        data={users}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
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
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  item: {
    padding: 10,
    marginTop: 20,
    marginBottom: 5,
    margin: 80,
    height: 50,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "white",
    backgroundColor: "#0F3154",
    fontWeight: "bold",
  },
  text: {
    fontSize: 15,
    top: 5,
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  title: {
    fontSize: 23,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  darkMode: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 30,
  },
});

export default NewManager;
