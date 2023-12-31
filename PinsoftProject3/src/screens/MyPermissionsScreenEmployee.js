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
  RefreshControl,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useThemeContext } from "../../ThemeContext";
import { useSelector } from "react-redux";
import axios from "axios";

const MyPermissionsScreenEmployee = () => {
  const navigation = useNavigation();

  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const [permissions, setPermissions] = useState([]);

  const login = useSelector((state) => state.data.login);
  const token = login.token;

  useEffect(() => {
    axios
      .get(
        "https://time-off-tracker-production.up.railway.app/time-off/get-my-time-off",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      .then(
        (response) => {
          const transformedData = response.data.map((prem) => {
            const StartDate = new Date(prem.startDate);
            const EndDate = new Date(prem.endDate);
            const formattedStartDate = StartDate.toISOString().split("T")[0];
            const formattedEndDate = EndDate.toISOString().split("T")[0];
            return {
              id: prem.id,
              requester: `${prem.employee.firstName} ${prem.employee.lastName}`,
              title: formattedStartDate,
              endDate: formattedEndDate,
              permission: prem.description,
              status: prem.timeOffType,
            };
          });
          setPermissions(transformedData);

          if (response) {
            console.log("Succses");
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }, [refreshing]);

  const { isDarkModeOn, toggleSwitch } = useThemeContext();
  const textColor = isDarkModeOn ? "white" : "black";

  const renderPermissionItem = ({ item }) => (
    <TouchableOpacity>
      <View style={styles.permissionItem}>
        <Text style={[styles.permissionTitle, { color: textColor ,fontWeight:'bold'}]}>
          From {item.title}   To {item.endDate}
        </Text>
        <Text style={[styles.permissionTitle, { color: textColor }]}>
          "{item.permission}"
        </Text>
        <Text style={getStatusStyle(item.status)}>{item.status}</Text>
      </View>
    </TouchableOpacity>
  );

  const getStatusStyle = (status) => {
    if (status === "APPROVED") {
      return styles.permissionStatusApproved;
    } else if (status === "REJECTED") {
      return styles.permissionStatusDenied;
    } else {
      return styles.permissionStatusPending;
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkModeOn ? "#171d2b" : "#f2f2f2" },
      ]}
    >
      <Text style={[styles.header, { color: textColor }]}>
        My Permission Requests
      </Text>
      <FlatList
        style={styles.flatList}
        data={permissions}
        renderItem={renderPermissionItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor="white"
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    ...Platform.select({
      web: {
        alignItems: "center",
      },
    }),
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    color: "white",
    alignSelf: "center",

    ...Platform.select({
      web: {},
    }),
  },
  listContent: {
    marginTop: 0,
  },
  permissionItem: {
    
    justifyContent: "space-between",
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1.2,
    borderColor: "#aaa",
    borderRadius: 10,
  },
  permissionTitle: {
    fontSize: 16,
    
  },
  permissionStatusApproved: {
    color: "green",
    fontWeight: "bold",
    fontSize: 15,
    paddingTop: 5,
  },
  permissionStatusDenied: {
    color: "#bd2d2d",
    fontWeight: "bold",
    fontSize: 15,
    paddingTop: 5,
  },
  permissionStatusPending: {
    color: "gray",
    fontWeight: "bold",
    fontSize: 15,
    paddingTop: 5,
  },
  flatList: {
    ...Platform.select({
      web: {
        width: 800,
      },
    }),
  },
});

export default MyPermissionsScreenEmployee;
