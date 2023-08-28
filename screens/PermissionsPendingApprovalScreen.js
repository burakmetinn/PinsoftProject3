import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, Image, RefreshControl } from 'react-native';

import React, { useState } from 'react';

const PermissionsPendingApprovalScreen = () => {
  const DATA = [
    {
      id: '1',
      name: 'Omar',
      permissionDate: '10/10/2023',
      reasonForPermission: 'Going Hospital',
    },
    {
      id: '2',
      name: 'Burak',
      permissionDate: '11/10/2023',
      reasonForPermission: 'Going Holiday',
    },
    {
      id: '3',
      name: 'Utku',
      permissionDate: '12/10/2023',
      reasonForPermission: 'To Move',
    },
    {
      id: '4',
      name: 'Serdar',
      permissionDate: '13/10/2023',
      reasonForPermission: 'Corona',
    },
    {
      id: '5',
      name: 'Demet',
      permissionDate: '14/10/2023',
      reasonForPermission: 'Headache',
    },
    {
      id: '6',
      name: 'Aylin',
      permissionDate: '15/10/2023',
      reasonForPermission: 'Corona',
    },
    {
      id: '7',
      name: 'Merve',
      permissionDate: '16/10/2023',
      reasonForPermission: 'Corona',
    },
    {
      id: '8',
      name: 'Elif',
      permissionDate: '17/10/2023',
      reasonForPermission: 'Corona',
    },
    {
      id: '9',
      name: 'Fatma',
      permissionDate: '18/10/2023',
      reasonForPermission: 'Corona',
    },
    {
      id: '10',
      name: 'Ayşe',
      permissionDate: '19/10/2023',
      reasonForPermission: 'Corona',
    },
  ];

  const [selectedId, setSelectedId] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => setSelectedId(selectedId === item.id ? null : item.id)}
      style={styles.item}
    >
      <View style={styles.row}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.date}>{item.permissionDate}</Text>
      </View>
      {selectedId === item.id && (
        <View style={styles.detailPanel}>
          <Text style={styles.detailText}>{`Reason: ${item.reasonForPermission}`}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => Alert.alert('Reject', 'Permission Rejected')} style={styles.button2}>
              <Text style={styles.buttonText}>To Reject</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Alert.alert('Approve', 'Permission Approved')} style={styles.button}>
              <Text style={styles.buttonText}>To Approve</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.view}>
      <View style={styles.header}>
        <Text style={styles.title}>Approving Pending</Text>
      </View>
      <Image
        style={{
          width: 50,
          height: 30,
          transform: [{ rotate: '300deg' }],
          position: 'absolute',
          top: 10,
          right: 10,
        }}
        source={require('../assets/sun.png')}
      />
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor="white" />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#0A2647',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  item: {
    padding: 10,
    marginTop:30,
    marginBottom:5,
    margin:40,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#ccc',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  date: {
    color: 'white',
  },
  
  detailPanel: {
    backgroundColor: '#0A2647',
    padding: 10,
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 10,
  },
  detailText: {
    fontSize: 16,
    color: 'white',
    marginBottom: 5,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#0A2647',
    padding: 8,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: 'white',
  },
  button2: {
    backgroundColor: '#0A2647',
    padding: 8,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: 'white',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default PermissionsPendingApprovalScreen;
