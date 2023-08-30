import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import Ionicons from "@expo/vector-icons/Ionicons";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addManagerId } from "../app/dataSlice";

const SelecetAdminScreen = ({ navigation }) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [selected, setSelected] = useState(false);
  const [managers, setManagers] = useState([]);
  const login = useSelector((state) => state.data.login);

  const token = login.token;
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(
        "https://time-off-tracker-production.up.railway.app/users/get-manager-users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      .then(
        (response) => {
          const transformedData = response.data.map((user) => ({
            label: `${user.firstName} ${user.lastName}`,
            value: user.id,
          }));
          setManagers(transformedData);

          console.log(managers);
        },
        (error) => {
          console.log(error);
          alert("make sure you Selected Your manager");
        }
      );
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Image
          style={{
            width: 300,
            height: 250,
            top: 50,
            alignSelf:'center',
            marginBottom: 70,
            ...Platform.select({
              web: {
                
                bottom: 30,
              },
            }),
          }}
          source={require("../assets/headerLogo.png")}
        />
      </View>
      <View>
        <Text style={styles.text}>Select Your Manager</Text>
      </View>
      <View style={styles.list}>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: "#483D8B" }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={managers}
          searchable={false}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={"..."}
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setValue(item.value);
            setIsFocus(false);
            setSelected(item);
          }}
          renderLeftIcon={() => (
            <Ionicons
              style={styles.icon}
              color={isFocus ? "#D3D3D3" : "black"}
              name="person"
              size={20}
            />
          )}
        />
      </View>
      
      <TouchableOpacity
          style={styles.btn}
          activeOpacity={0.7}
          disabled={selected === false ? true === true : false}
          onPress={() => {
            dispatch(addManagerId(selected.value));
            navigation.navigate("TabsEmployee");
          }}
          hitSlop={{ left: 100, right: 100, top: 20, bottom: 20 }}
        >
          <Text style={styles.btnText}>Continue</Text>
      </TouchableOpacity>
      
    </View>
  );
};

export default SelecetAdminScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
    flex: 1,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 10,
    paddingHorizontal: 12,
    marginHorizontal: 20,
    ...Platform.select({
      web: {
        width: 850,
        alignSelf: 'center',
      },
    }),
  },
  list: {
    backgroundColor: "white",
  },
  icon: {
    marginRight: 5,
  },
  text: {
    top: 5,
    paddingBottom: 30,
    alignSelf: 'center',
    fontFamily: "Cochin",
    fontSize: 22,
    ...Platform.select({
      web: {
        
      },
    }),
  },
  btn: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    width: 247,
    backgroundColor: "#0f396b",
    top: 100,
    alignSelf:'center',
    ...Platform.select({
      web: {
       
        marginBottom: 50,
      },
    }),
  },
  btnText: {
    color: "white",
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    fontFamily: "Avenir",
    fontWeight: "bold",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
