import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, SafeAreaView, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const MyPermissionsScreenEmployee = () => {
  const navigation = useNavigation();


  const [permissions, setPermissions] = useState([
    { id: '1', title: '09/08/2023', status: 'Approved' , requester: 'Firstname1 Lastname1' },
    { id: '2', title: '11/08/2023', status: 'Denied' , requester: 'Firstname2 Lastname2'},
    { id: '3', title: '18/08/2023', status: 'Pending' , requester: 'Firstname3 Lastname3'},
    { id: '4', title: '26/08/2023', status: 'Pending' , requester: 'Firstname4 Lastname4'},
    { id: '5', title: '30/08/2023', status: 'Approved' , requester: 'Firstname5 Lastname5'},
    
  ]);

  const [selectedPermission, setSelectedPermission] = useState(null);


  const renderPermissionItem = ({ item }) => (
    <TouchableOpacity>
      <View style={styles.permissionItem}>
        <Text style={styles.permissionTitle}>{item.title}</Text>
        <Text style={getStatusStyle(item.status)}>{getStatusText(item.status)}</Text>
      </View>
    </TouchableOpacity>
  );

  const getStatusStyle = (status) => {
    if (status === 'Approved') {
      return styles.permissionStatusApproved;
    } else if (status === 'Denied') {
      return styles.permissionStatusDenied;
    } else {
      return styles.permissionStatusPending;
    }
  };

  const getStatusText = (status) => {
    if (status === 'Approved') {
      return 'Approved';
    } else if (status === 'Denied') {
      return 'Denied';
    } else {
      return 'Pending...';
    }
  };

  return (
 
    <View style={styles.container}>
      <Text style={styles.header}>My Permission Requests</Text>
      <FlatList
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
    fontWeight: 'bold',
    marginBottom: 30,
  },
  listContent: {
    marginTop: 0,
  },
  permissionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 22,
    paddingVertical: 14,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 8,
    backgroundColor: '#f4f4f4',
  },
  permissionTitle: {
    fontSize: 16,
  },
  permissionStatusApproved: {
    color: 'green',
    fontWeight: 'bold',
  },
  permissionStatusDenied: {
    color: '#bd2d2d',
    fontWeight: 'bold',
  },
  permissionStatusPending: {
    color: 'gray',
    fontWeight: 'bold',
  },
  
});

export default MyPermissionsScreenEmployee