import React from "react";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { View } from "react-native-web";

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
    <View>
      <ScrollView>
        {users.map((item) => (
          <TouchableOpacity id={item.id}>
            <Text>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default SelectAdminScreen;
