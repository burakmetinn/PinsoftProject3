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
      title: `From ${new Date(perm.startDate).toDateString()}   To ${new Date(
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
  const textColor = isDarkModeOn ? 'white' : 'black';

  const openPermissionDetails = (permission) => {
    navigation.navigate('My Permissions Detail', { permission });
  };

  const renderPermissionItem = ({ item }) => (
    <TouchableOpacity onPress={() => openPermissionDetails(item)}>
      <View style={styles.permissionItem}>
        <Text style={[styles.permissionTitle, { color: textColor }]}>{item.requester}</Text>

        <Text style={[styles.permissionDate, { color: textColor }]}>{item.title}</Text>

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
    textAlign: 'center',
    marginBottom: 22,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1.2,
    borderColor: '#bbb',
    borderRadius: 10,
  },
  permissionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 5
  },

  permissionDate: {
    fontSize: 15,
    marginBottom: 10,
  },
  permissionStatusApproved: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: 16,
  },
  permissionStatusDenied: {
    color: '#bd2d2d',
    fontWeight: 'bold',
    fontSize: 16,
  },
  permissionStatusPending: {
    color: 'gray',
    fontWeight: 'bold',
    fontSize: 16,
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
