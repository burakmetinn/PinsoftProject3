import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const MyPermissionsScreenList = () => {
  const navigation = useNavigation();

  const response = useSelector((state) => state.data.permissionsDATA);

  const [permissions, setPermissions] = useState([]);

  console.log(response);

  useEffect(() => {
    const transformedData = response.map((perm) => ({
      id: perm.id,
      title: `from ${new Date(perm.startDate).toDateString()} To ${new Date(
        perm.endDate
      ).toDateString()}`,
      status: perm.timeOffType,
      requester: `${perm.employee.firstName}  ${perm.employee.lastName}`,
      label: `${perm.employee.firstName} ${perm.employee.lastName}`,
      cause: perm.description,
    }));

    setPermissions(transformedData);
  }, []);

  const [selectedPermission, setSelectedPermission] = useState(null);

  const openPermissionDetails = (permission) => {
    navigation.navigate('My Permissions Detail', { permission });
  };

  const renderPermissionItem = ({ item }) => (
    <TouchableOpacity onPress={() => openPermissionDetails(item)}>
      <View style={styles.permissionItem}>
        <Text style={styles.permissionTitle}>{item.requester}</Text>

        <Text style={styles.permissionDate}>{item.title}</Text>

        <Text style={getStatusStyle(item.status)}>
          {getStatusText(item.status)}
        </Text>
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
      <Text style={styles.header}>All Requests</Text>
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
    backgroundColor: '#0A2647',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: 'white',
    ...Platform.select({
      web: {
        marginLeft: 650,
        marginTop: 50,
      },
    }),
  },
  listContent: {
    marginTop: 0,
  },
  permissionItem: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    marginBottom: 22,
    paddingVertical: 14,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 8,
    backgroundColor: '#ffdb58',
  },
  permissionTitle: {
    fontSize: 20,
  },
  permissionDate: {
    fontSize: 16,
  },
  permissionStatusApproved: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: 20,
  },
  permissionStatusDenied: {
    color: '#bd2d2d',
    fontWeight: 'bold',
    fontSize: 20,
  },
  permissionStatusPending: {
    color: 'gray',
    fontWeight: 'bold',
    fontSize: 20,
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
