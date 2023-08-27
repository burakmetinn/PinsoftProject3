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
} from "react-native";
import { useSelector } from "react-redux";

const NewManager = () => {
  const [users, setUsers] = useState([]);
  const login = useSelector((state) => state.data.login);

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

  const renderItem = ({ item }) => (
    <View>
      <TouchableOpacity>
        <Text>{item.label}</Text>
      </TouchableOpacity>
    </View>
  );
  return (
    <View>
      <View>
        <Text>Selecet New Manager</Text>
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
const styles = StyleSheet.create({});

export default NewManager;
