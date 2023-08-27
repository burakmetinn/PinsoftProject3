import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useThemeContext } from "../../ThemeContext";

const MyPermissionsScreenList = () => {
  const navigation = useNavigation();

  const [permissions, setPermissions] = useState([
    {
      id: "1",
      title: "09/08/2023",
      status: "Approved",
      requester: "Firstname1 Lastname1",
    },
    {
      id: "2",
      title: "11/08/2023",
      status: "Denied",
      requester: "Firstname2 Lastname2",
    },
    {
      id: "3",
      title: "18/08/2023",
      status: "Pending",
      requester: "Firstname3 Lastname3",
    },
    {
      id: "4",
      title: "26/08/2023",
      status: "Pending",
      requester: "Firstname4 Lastname4",
    },
    {
      id: "5",
      title: "30/08/2023",
      status: "Approved",
      requester: "Firstname5 Lastname5",
    },
    {
      id: "6",
      title: "09/09/2023",
      status: "Approved",
      requester: "Firstname6 Lastname6",
    },
    {
      id: "7",
      title: "11/09/2023",
      status: "Denied",
      requester: "Firstname7 Lastname7",
    },
    {
      id: "8",
      title: "18/09/2023",
      status: "Pending",
      requester: "Firstname8 Lastname8",
    },
    {
      id: "9",
      title: "26/09/2023",
      status: "Pending",
      requester: "Firstname9 Lastname9",
    },
    {
      id: "10",
      title: "30/09/2023",
      status: "Pending",
      requester: "Firstname10 Lastname10",
    },
    {
      id: "11",
      title: "09/10/2023",
      status: "Pending",
      requester: "Firstname11 Lastname11",
    },
    {
      id: "12",
      title: "11/10/2023",
      status: "Pending",
      requester: "Firstname12 Lastname12",
    },
    {
      id: "13",
      title: "18/10/2023",
      status: "Pending",
      requester: "Firstname13 Lastname13",
    },
    {
      id: "14",
      title: "26/10/2023",
      status: "Pending",
      requester: "Firstname14 Lastname14",
    },
    {
      id: "15",
      title: "30/10/2023",
      status: "Pending",
      requester: "Firstname15 Lastname15",
    },
  ]);

  const { isDarkModeOn, toggleSwitch } = useThemeContext();
  const textColor = isDarkModeOn ? 'white' : 'black';

  const openPermissionDetails = (permission) => {
    navigation.navigate("My Permissions Detail", { permission });
  };

  const renderPermissionItem = ({ item }) => (
    <TouchableOpacity onPress={() => openPermissionDetails(item)}>
      <View style={styles.permissionItem}>
        <Text style={[styles.permissionTitle,  {color: textColor}]}>{item.title}</Text>
        <Text style={getStatusStyle(item.status)}>
          {getStatusText(item.status)}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const getStatusStyle = (status) => {
    if (status === "Approved") {
      return styles.permissionStatusApproved;
    } else if (status === "Denied") {
      return styles.permissionStatusDenied;
    } else {
      return styles.permissionStatusPending;
    }
  };

  const getStatusText = (status) => {
    if (status === "Approved") {
      return "Approved";
    } else if (status === "Denied") {
      return "Denied";
    } else {
      return "Pending...";
    }
  };

  return (
    <View style={[styles.container,  {backgroundColor: isDarkModeOn? '#171d2b' :'#f2f2f2'}]}>
      <Text style={[styles.header,  {color: textColor}]}>Permission Requests</Text>
      <FlatList
        showsHorizontalScrollIndicator={false}
        style={styles.flatList}
        data={permissions}
        renderItem={renderPermissionItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    color: "white",
    alignSelf: 'center',
    ...Platform.select({
      web: {
        
      },
    }),
  },
  listContent: {
    marginTop: 0,
  },
  permissionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderWidth: 1.2,
    borderColor: "#bbb",
    borderRadius: 10,
  },
  permissionTitle: {
    fontSize: 16,
  },
  permissionStatusApproved: {
    color: "green",
    fontWeight: "bold",
  },
  permissionStatusDenied: {
    color: "#bd2d2d",
    fontWeight: "bold",
  },
  permissionStatusPending: {
    color: "gray",
    fontWeight: "bold",
  },
  flatList: {
    ...Platform.select({
      web: {
        width: 800,
        left: 350,
      },
    }),
  },
});

export default MyPermissionsScreenList;
