import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";


function PermissionRequested() {
  const [isPermissionRequested, setIsPermissionRequested] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [permissionStatus, setPermissionStatus] = useState("");

  const [selectedPermission, setSelectedPermission] = useState(null);

  const handlePermissionClick = (permission) => {
    setSelectedPermission(permission);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setSelectedPermission(null);
    setIsModalVisible(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        {PermissionRequested.map((permission) => (
          <TouchableOpacity
            key={permission.id}
            style={{ padding: 10, borderBottomWidth: 1, borderColor: "gray" }}
            onPress={() => handlePermissionClick(permission)}
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
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{ padding: 20, backgroundColor: "white", borderRadius: 10 }}
          >
            {selectedPermission && (
              <View>
                <Text>Kullanıcının İzin Talebi</Text>
                <Text>Kullanıcı: {selectedPermission.user}</Text>
                <Text>İzin: {selectedPermission.permission}</Text>
                <Text>Başlangıç Tarihi: {selectedPermission.startDate}</Text>
                <Text>Bitiş Tarihi: {selectedPermission.endDate}</Text>
                <Button title="Kapat" onPress={handleCloseModal} />
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default PermissionRequested;
