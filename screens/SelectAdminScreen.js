import React from "react";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Text, ScrollView, View, Image } from "react-native";
import { StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const SelectAdminScreen = ({ navigation }) => {
  const [users, setUsers] = useState([
    {
      name: "Burak",
      key: "1",
    },
    {
      name: "Selim",
      key: "2",
    },
    {
      name: "Zeynep",
      key: "3",
    },
  ]);
  return (
    <View style={styles.view}>
      <View>
        <Image
          style={{
            width: 280,
            height: 230,
            top: 40,
          }}
          source={require("../assets/headerLogo.png")}
        />
      </View>
      <View>
        <Text style={styles.text}>Select Your Manager</Text>
      </View>
      <ScrollView style={styles.scroll}>
        {users.map((item) => (
          <TouchableOpacity
            key={item.key}
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
    paddingTop: 50,
    fontFamily: "Cochin",
    fontWeight: "bold",
    fontSize: 22,
  },
  userText: {
    width: 150,
    fontSize: 16,
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
