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
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { addPermList } from '../../app/dataSlice';
import { useThemeContext } from '../../../ThemeContext';

const MyPermissionsScreenList = () => {
  const navigation = useNavigation();

  const response = useSelector((state) => state.data.permissionsDATA);

  const [permissions, setPermissions] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  };

  const login = useSelector((state) => state.data.login);

  const dispatch = useDispatch();

  const token = login.token;

  useEffect(() => {
    axios
      .get('https://time-off-tracker-production.up.railway.app/time-off', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      .then(
        (response) => {
          dispatch(addPermList(response.data));

          if (response) {
            console.log('Succses');
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }, [refreshing]);

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
  }, [refreshing, response]);

  const { isDarkModeOn, toggleSwitch } = useThemeContext();
  const textColor = isDarkModeOn ? 'white' : '#0A2647';

  const openPermissionDetails = (permission) => {
    navigation.navigate('My Permissions Detail', { permission });
  };

  const renderPermissionItem = ({ item }) => (
    <TouchableOpacity onPress={() => openPermissionDetails(item)}>
      <View style={styles.permissionItem}>
        <Text style={styles.permissionTitle}>{item.requester}</Text>

        <Text style={styles.permissionDate}>{item.title}</Text>

        <Text style={getStatusStyle(item.status)}>{item.status}</Text>
      </View>
    </TouchableOpacity>
  );

  const getStatusStyle = (status) => {
    if (status === 'APPROVED') {
      return styles.permissionStatusApproved;
    } else if (status === 'REJECTED') {
      return styles.permissionStatusDenied;
    } else {
      return styles.permissionStatusPending;
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkModeOn ? '#171d2b' : '#f2f2f2' },
      ]}
    >
      <Text style={[styles.header, { color: textColor }]}>All Requests</Text>
      <FlatList
        showsHorizontalScrollIndicator={false}
        style={styles.flatList}
        data={permissions}
        renderItem={renderPermissionItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor='white'
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
    justifyContent: 'center',
    alignItems: 'center',
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
        marginTop: 0,
      },
    }),
  },
  permissionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    flexWrap: 'wrap',
    width: 350,
    textAlign: 'center',
    height: 100,
    marginBottom: 22,
    paddingVertical: 14,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: '#0A2647',
    elevation: 3,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 1,
      height: 6,
    },
    shadowRadius: 30,
  },
  permissionTitle: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  permissionDate: {
    fontSize: 16,
    color: 'white',
  },
  permissionStatusApproved: {
    color: '#17e86d',
    fontWeight: 'bold',
    fontSize: 20,
  },
  permissionStatusDenied: {
    color: '#ff000c',
    fontWeight: 'bold',
    fontSize: 20,
  },
  permissionStatusPending: {
    color: '#9da2a4',
    fontWeight: 'bold',
    fontSize: 20,
  },
  flatList: {
    ...Platform.select({
      web: {
        width: 1000,
        left:160
      },
    }),
  },
});

export default MyPermissionsScreenList;
