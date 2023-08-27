import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Modal, Switch
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { addUser, addManagerId, addLogin } from "../app/dataSlice";
import axios from "axios";
import { useThemeContext } from "../../ThemeContext";

const ProfileScreenEmployee = ({ navigation }) => {
  const { isDarkModeOn, toggleSwitch } = useThemeContext();
  const [isSheetVisible, setSheetVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Name 1");
  const login = useSelector((state) => state.data.login);

  const token = login.token;
  const dispatch = useDispatch();

  const user = useSelector((state) => state.data.user);
  const firstName = user.firstName;
  const lastName = user.lastName;
  const email = user.email;
  const role = user.role;
  useEffect(() => {
    axios
      .get("https://time-off-tracker-production.up.railway.app/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(
        (response) => {
          dispatch(addUser(response.data));
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setSheetVisible(false);
  };

  const handleLogout = () => {
    dispatch(addLogin({}));
    dispatch(addManagerId(""));
    dispatch(addUser({}));
    navigation.navigate("LoginScreen");
  };

  const textColor = isDarkModeOn ? 'white' : 'black';

  return (
    <View style={[styles.container,  {backgroundColor: isDarkModeOn? '#171d2b' :'#f2f2f2'}]}>
      <View style={styles.infoSection}>
        <Ionicons
          name="person-circle"
          style={styles.icon}
          color={textColor}
          size={100}
        />
        <Text style={[styles.sampleName,  {color: textColor}]}>
          {firstName} {lastName}
        </Text>
      </View>

      <View style={styles.infoContainer}>
      <Text style={[styles.sampleInfoTitle,  {color: textColor}]}>Email Address</Text>
      <Text style={[styles.sampleInfo,  {color: textColor}]}>{email}</Text>
      </View>

      <View style={styles.infoContainer}>
      <Text style={[styles.sampleInfoTitle,  {color: textColor}]}>Role</Text>
      <Text style={[styles.sampleInfo,  {color: textColor}]}>{role}</Text>
      </View>

      <View style={styles.optionsContainer}>
        <Text style={[styles.optionsTitle,  {color: textColor}]}>Manager</Text>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => setSheetVisible(true)}
        >
          <Ionicons name="person-circle" size={30} color="gray" />
          <Text style={[styles.managerText,  {color: textColor}]}>{selectedOption}</Text>
          <Ionicons
            style={styles.managerIcon}
            name="chevron-forward"
            size={20}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.darkMode}>
      <Text style={{color:textColor, fontWeight:'bold', fontSize: 16}}>Dark Mode   </Text>
      <Switch
         value={isDarkModeOn}
         onValueChange={toggleSwitch}
        ></Switch>
      </View>

      <TouchableOpacity onPress={handleLogout} style={styles.logOutContainer}>
        <Ionicons name="log-out-outline" size={25} color="red" />
        <Text style={styles.logOutText}>Log Out</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isSheetVisible}
        onRequestClose={() => setSheetVisible(false)}
      >
        <TouchableOpacity
          style={styles.containerBg}
          activeOpacity={1}
          onPressOut={() => setSheetVisible(false)}
        ></TouchableOpacity>

        <View style={styles.bottomSheet}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setSheetVisible(false)}
          >
            <Ionicons name="reorder-two-outline" size={25} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.sheetOption,
              selectedOption === "Name 1" && styles.selectedOption,
            ]}
            onPress={() => handleOptionSelect("Name 1")}
          >
            <Text>Name 1</Text>
            {selectedOption === "Name 1" && (
              <Ionicons name="checkmark-sharp" color="green" size={15} />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.sheetOption,
              selectedOption === "Name 2" && styles.selectedOption,
            ]}
            onPress={() => handleOptionSelect("Name 2")}
          >
            <Text>Name 2</Text>
            {selectedOption === "Name 2" && (
              <Ionicons name="checkmark-sharp" color="green" size={15} />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.sheetOption,
              selectedOption === "Name 3" && styles.selectedOption,
            ]}
            onPress={() => handleOptionSelect("Name 3")}
          >
            <Text>Name 3</Text>
            {selectedOption === "Name 3" && (
              <Ionicons name="checkmark-sharp" color="green" size={15} />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.sheetOption,
              selectedOption === "Name 4" && styles.selectedOption,
            ]}
            onPress={() => handleOptionSelect("Name 4")}
          >
            <Text>Name 4</Text>
            {selectedOption === "Name 4" && (
              <Ionicons name="checkmark-sharp" color="green" size={15} />
            )}
          </TouchableOpacity>
        </View>
      </Modal>
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
  infoSection: {
    marginTop: 5,
    marginBottom: 25,
    marginLeft: 20,
    flexDirection: "row",
    alignItems: "center",
    ...Platform.select({
      web: {
        alignSelf: "flex-start",
        flexDirection: "row",
      },
    }),
  },
  optionsTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 5,
    color: "white",
  },

  sampleName: {
    fontSize: 20,
    paddingLeft: 10,
    fontWeight: "bold",
    color: "white",
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  sampleInfoTitle: {
    fontSize: 17,
    color: "white",
    alignSelf: "flex-start",
    flexDirection: "row",
    fontWeight: 'bold',
  },

  sampleInfo: {
    fontSize: 15,
    color: "white",
    alignSelf: "flex-start",
    flexDirection: "row",
    marginBottom: 30,
    top: 5,
  },

  infoContainer: {
    marginLeft: 30,
    marginBottom: 15,
  },
  
  optionsContainer: {
    marginLeft: 30,
    marginBottom: 20,
    ...Platform.select({
      web: {
        right: 650,
      },
    }),
  },
  optionButton: {
    padding: 5,
    paddingLeft: 10,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 5,
    width: 220,
    alignItems: "center",
  },

  managerText: {
    paddingRight: 90,
    paddingLeft: 10,
    color: "white",
  },

  containerBg: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: 10,
    
  },
  
  bottomSheet: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 12,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  closeButton: {
    alignSelf: "center",
    marginBottom: 20,
  },

  sheetOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#dbdbdb",
  },

  logOutContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    marginLeft: 30,
    marginTop: 50,
    width: 120,
    ...Platform.select({
      web: {
        bottom: 50,
        left: 700,
      },
    }),
  },
  logOutText: {
    marginLeft: 10,
    color: "red",
    fontWeight: "bold",
    fontSize: 15,
  },

  darkMode:{
    flexDirection: "row",
    alignItems: 'center',
    marginLeft: 30,
  },

  
});

export default ProfileScreenEmployee;
