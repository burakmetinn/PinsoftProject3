import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, SafeAreaView, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const MyPermissionsScreenList = () => {
  const navigation = useNavigation();


  const [permissions, setPermissions] = useState([
    { id: '1', title: '09/08/2023', status: 'approved' , requester: 'Firstname1 Lastname1' },
    { id: '2', title: '21/08/2023', status: 'denied' , requester: 'Firstname2 Lastname2'},
    { id: '3', title: '28/08/2023', status: 'pending' , requester: 'Firstname3 Lastname3'},
    { id: '4', title: '03/09/2023', status: 'pending' , requester: 'Firstname4 Lastname4'},
    { id: '5', title: '10/09/2023', status: 'approved' , requester: 'Firstname5 Lastname5'},
    { id: '6', title: '09/08/2023', status: 'approved' , requester: 'Firstname6 Lastname6'},
    { id: '7', title: '21/08/2023', status: 'denied' , requester: 'Firstname7 Lastname7'},
    { id: '8', title: '28/08/2023', status: 'pending' , requester: 'Firstname8 Lastname8'},
    { id: '9', title: '03/09/2023', status: 'pending' , requester: 'Firstname9 Lastname9'},
    { id: '10', title: '10/09/2023', status: 'pending', requester: 'Firstname10 Lastname10' },
    { id: '11', title: '09/08/2023', status: 'pending' , requester: 'Firstname11 Lastname11'},
    { id: '12', title: '21/08/2023', status: 'pending' , requester: 'Firstname12 Lastname12'},
    { id: '13', title: '28/08/2023', status: 'pending' , requester: 'Firstname13 Lastname13'},
    { id: '14', title: '03/09/2023', status: 'pending' , requester: 'Firstname14 Lastname14'},
    { id: '15', title: '10/09/2023', status: 'pending', requester: 'Firstname15 Lastname15'},
    
  ]);

  const [selectedPermission, setSelectedPermission] = useState(null);

/*
  useEffect(() => {
    
    const fetchPermissions = async () => {
      try {
        const response = await fetch('URL');
        const data = await response.json();
        setPermissions(data); 
      } catch (error) {
        console.error('Error fetching permissions:', error);
      }
    };

    fetchPermissions();
  }, []);
*/


  const openPermissionDetails = (permission) => {
    navigation.navigate("My Permissions Detail",{permission});
  };

  const closePermissionDetails = () => {
    setSelectedPermission(null);
  };

  const renderPermissionItem = ({ item }) => (
    <TouchableOpacity onPress={() => openPermissionDetails(item)}>
      <View style={styles.permissionItem}>
        <Text style={styles.permissionTitle}>{item.title}</Text>
        <Text style={getStatusStyle(item.status)}>{getStatusText(item.status)}</Text>
      </View>
    </TouchableOpacity>
  );

  const getStatusStyle = (status) => {
    if (status === 'approved') {
      return styles.permissionStatusApproved;
    } else if (status === 'denied') {
      return styles.permissionStatusDenied;
    } else {
      return styles.permissionStatusPending;
    }
  };

  const getStatusText = (status) => {
    if (status === 'approved') {
      return 'Approved';
    } else if (status === 'denied') {
      return 'Denied';
    } else {
      return 'Pending...';
    }
  };

  return (
 
    <View style={styles.container}>
      <Text style={styles.header}>Permission Requests</Text>
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
    marginBottom: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ccc',
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
    color: 'red',
    fontWeight: 'bold',
  },
  permissionStatusPending: {
    color: 'orange',
    fontWeight: 'bold',
  },
  
});

export default MyPermissionsScreenList