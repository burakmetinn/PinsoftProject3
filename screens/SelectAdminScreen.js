import React from "react";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Text, ScrollView, View } from "react-native";
import { StyleSheet } from "react-native";

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
            <Text style={styles.us}>{item.name}</Text>
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
    paddingTop: 180,
    fontWeight: "bold",
  },
  us: {
    width: 110,
    backgroundColor: "#ebeff2",
    borderRadius: 20,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    textAlign: "center",
    padding: 15,
    top: 30,
  },
});

export default SelectAdminScreen;
