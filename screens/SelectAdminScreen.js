import React from "react";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Text, ScrollView, View } from "react-native";
import { StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const SelectAdminScreen = ({ navigation }) => {
  const [users, setUsers] = useState([
    {
      name: "John",
      id: "1",
    },
    {
      name: "Jake",
      id: "2",
    },
    {
      name: "Anna",
      id: "3",
    },
  ]);
  return (
    <View style={styles.view}>
      <View>
        <Text style={styles.text}>Select Your Menager</Text>
      </View>
      <ScrollView style={styles.scroll}>
        {users.map((item) => (
          <TouchableOpacity
            id={item.id}
            onPress={() => {
              navigation.navigate("TabsEmployee");
            }}
          >
            <Text style={styles.userText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
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
  text: {
    paddingTop: 220,
    fontWeight: "bold",
    fontFamily: "Didot",
    fontSize: 20,
  },
  userText: {
    width: 110,
    fontSize: 17,
    backgroundColor: "#0f396b",
    fontFamily: "Avenir-Heavy",
    color: "white",
    borderRadius: 20,
    height: 70,
    marginBottom: 20,
    justifyContent: "center",
    textAlign: "center",
    padding: 23,
    top: 30,
  },
});

export default SelectAdminScreen;
