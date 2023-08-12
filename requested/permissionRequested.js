import React, { useState } from 'react';
import { View, Text, Button, Modal } from 'react-native';

function permissionRequested() {
  const [isPermissionRequested, setIsPermissionRequested] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [permissionStatus, setPermissionStatus] = useState('');

  const requestPermission = () => {
    setIsPermissionRequested(true);
    setIsModalVisible(true);
  };

  const handleApprove = () => {
    setPermissionStatus('Onaylandı');
    setIsModalVisible(false);
  };

  const handleReject = () => {
    setPermissionStatus('Reddedildi');
    setIsModalVisible(false);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Kullanıcının İzin Talebi Sayfası</Text>
      {!isPermissionRequested && (
        <Button title="İzin Talebi Gönder" onPress={requestPermission} />
      )}

      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ padding: 20, backgroundColor: 'white', borderRadius: 10 }}>
            <Text>Kullanıcının İzin Talebi</Text>
            <Button title="Onayla" onPress={handleApprove} />
            <Button title="Reddet" onPress={handleReject} />
          </View>
        </View>
      </Modal>

      {isPermissionRequested && (
        <Text>Yönetici İzin Durumu: {permissionStatus}</Text>
      )}
    </View>
  );
}

export default permissionRequested;