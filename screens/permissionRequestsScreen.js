import React, { useState } from 'react';
import { View, Text, Button, Modal,TouchableOpacity } from 'react-native';

function PermissionRequestsScreen() {
  const [permissionRequests, setPermissionRequests] = useState([
    { id: 1, user: 'Rabia Can', permission: 'Hastane randevum var.', startDate: '2023-08-16', endDate: '2023-08-16'},
    { id: 2, user: 'Ülkü Bıçak', permission: 'Acil şehir dışına çıkmam gerekiyor.', startDate: '2023-09-16', endDate: '2023-09-20' },
  ]);

  const [selectedPermission, setSelectedPermission] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

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
        {permissionRequests.map((permission) => (
          <TouchableOpacity
            key={permission.id}
            style={{ padding: 10, borderBottomWidth: 1, borderColor: 'gray' }}
            onPress={() => handlePermissionClick(permission)}
          >
            <Text>{permission.user} - {permission.permission}</Text>
            <Text>Başlangıç Tarihi: {permission.startDate}</Text>
            <Text>Bitiş Tarihi: {permission.endDate}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ padding: 20, backgroundColor: 'white', borderRadius: 10 }}>
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