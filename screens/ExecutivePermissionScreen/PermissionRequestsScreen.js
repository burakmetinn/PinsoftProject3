import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { StyleSheet } from 'react-native';


function PermissionRequestsScreen() {
  const [permissionRequests, setPermissionRequests] = useState([
    {
      id: 1,
      user: "Rabia Can",
      permission: "Hastane randevum var.",
      startDate: "2023-08-16",
      endDate: "2023-08-16",
    },
    {
      id: 2,
      user: "Ülkü Bıçak",
      permission: "Acil şehir dışına çıkmam gerekiyor.",
      startDate: "2023-09-16",
      endDate: "2023-09-20",
    },
  ]);
  const [selectedPermission, setSelectedPermission] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activePermissionIndex, setActivePermissionIndex] = useState(null);

  const handlePermissionClick = (permission, index) => {
    setSelectedPermission(permission);
    setActivePermissionIndex(index);
    setIsModalVisible(true);
  };
  const handleApprove = () => {
    const updatedPermissionRequests = [...permissionRequests];
    updatedPermissionRequests[activePermissionIndex].status = "Onaylandı";
    setPermissionRequests(updatedPermissionRequests);
    setActivePermissionIndex(null);
    handleCloseModal();
  };
  const handleReject = () => {
    const updatedPermissionRequests = [...permissionRequests];
    updatedPermissionRequests[activePermissionIndex].status = "Reddedildi";
    setPermissionRequests(updatedPermissionRequests);
    setActivePermissionIndex(null);
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setSelectedPermission(null);
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        {permissionRequests.map((permission) => (
          <TouchableOpacity
            key={permission.id}
            style={{
              padding: 10,
              borderBottomWidth: 1,
              borderColor: "gray",
              backgroundColor: permission.id % 2 === 0 ? "lightgray" : "white",
              flex: 1,
            }}
            onPress={() => handlePermissionClick(permission, index)}
          >
            <Text>
              {permission.user} - {permission.permission}
            </Text>
            <Text>Başlangıç Tarihi: {permission.startDate}</Text>
            <Text>Bitiş Tarihi: {permission.endDate}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal visible={isModalVisible} animationType="slide" transparent>
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
          onPress={handleCloseModal}
        >
          <View
            style={{ padding: 20, backgroundColor: "white", borderRadius: 10 }}
          >
            {selectedPermission && (
              <View>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  Kullanıcının İzin Talebi
                </Text>
                <Text>Kullanıcı: {selectedPermission.user}</Text>
                <Text>İzin: {selectedPermission.permission}</Text>
                <Text>Başlangıç Tarihi: {selectedPermission.startDate}</Text>
                <Text>Bitiş Tarihi: {selectedPermission.endDate}</Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 10,
                  }}
                >
                  <Button
                    title="Onayla"
                    onPress={handleApprove}
                    color="green"
                  />
                  <Button title="Reddet" onPress={handleReject} color="red" />
                </View>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#0A2647",
  },
});
export default PermissionRequestsScreen;
