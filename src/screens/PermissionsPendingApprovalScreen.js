import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  RefreshControl,
} from 'react-native';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { addPermList } from '../app/dataSlice';

const PermissionsPendingApprovalScreen = () => {
  const [rawData, setRawData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const login = useSelector((state) => state.data.login);
  const token = login.token;

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const dispatch = useDispatch();
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
  }, [refreshing, permission]);

  const permission = useSelector((state) => state.data.permissionsDATA);

  useEffect(() => {
    const transformedData = permission
      .filter((perm) => perm.timeOffType === 'PENDING')
      .map((perm) => ({
        id: perm.id,
        status: perm.timeOffType,
        name: `${perm.employee.firstName} ${perm.employee.lastName}`,
        permissionDate: `${new Date(perm.startDate).toDateString()}`,
        permissionEndDate: `${new Date(perm.endDate).toDateString()}`,
        reasonForPermission: perm.description,
      }));

    setRawData(transformedData);
    console.log(selectedId);
  }, [refreshing, permission]);

  const handleReject = () => {
    const xhr = new XMLHttpRequest();
    xhr.open(
      'PUT',
      `https://time-off-tracker-production.up.railway.app/time-off/update/${selectedId}`
    );

    xhr.setRequestHeader('Authorization', `Bearer ${token}`);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          console.log(response);
          console.log('REJECTED');
        } else {
          console.log('Error. Please try again.');
        }
      }
    };

    const requestData = JSON.stringify({
      timeOffType: 'REJECTED',
    });

    xhr.send(requestData);
    handleRefresh();
  };

  const handleApprove = () => {
    const xhr = new XMLHttpRequest();
    xhr.open(
      'PUT',
      `https://time-off-tracker-production.up.railway.app/time-off/update/${selectedId}`
    );

    xhr.setRequestHeader('Authorization', `Bearer ${token}`);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          console.log(response);
          console.log('Approved');
        } else {
          console.log('Error. Please try again.');
        }
      }
    };

    const requestData = JSON.stringify({
      timeOffType: 'APPROVED',
    });

    xhr.send(requestData);
    handleRefresh();
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setSelectedId(item.id);
          setShowDetails(!showDetails);
        }}
        style={styles.item}
      >
        <Text style={styles.cardTitle}>Permission Info</Text>
        <View style={styles.row}>
          <Text style={styles.name}>Employee Name : {item.name}</Text>
          <Text style={styles.date}>From : {item.permissionDate}</Text>
          <Text style={styles.date}>To : {item.permissionEndDate}</Text>
        </View>
        <Text style={styles.sub}>Click to see more</Text>
      </TouchableOpacity>

      {selectedId === item.id && !showDetails && (
        <View style={styles.detailPanel}>
          <Text
            style={styles.detailText}
          >{`Reason: ${item.reasonForPermission}`}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => Alert.alert('Reject', 'Permission Rejected')}
              style={styles.button2}
            >
              <Text style={styles.buttonText} onPress={handleReject}>
                Reject
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Alert.alert('Approve', 'Permission Approved')}
              style={styles.button}
            >
              <Text style={styles.buttonText} onPress={handleApprove}>
                Approve
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.view}>
      <View style={styles.header}>
        <Text style={styles.title}>Pending requests</Text>
      </View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        style={styles.flatList}
        data={rawData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
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
  view: {
    backgroundColor: '#0A2647',
    height: 1500,
    ...Platform.select({
      web: {
        alignItems: 'center',
      },
    }),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
    textAlign: 'center',
  },
  sub: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'grey',
    textAlign: 'right',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#0A2647',
    textAlign: 'center',
  },
  item: {
    padding: 10,
    marginTop: 20,
    marginBottom: 5,
    margin: 40,
    height: 125,
    borderRadius: 10,
    backgroundColor: '#ffdb58',
  },
  row: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0A2647',
  },
  date: {
    color: '#0A2647',
  },

  detailPanel: {
    backgroundColor: '#ffdb58',
    padding: 10,
    marginHorizontal: 10,
    marginTop: 10,
    marginLeft: 40,
    borderRadius: 10,
    width: 330,
  },
  detailText: {
    fontSize: 16,
    color: '#0A2647',
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
    borderColor: '#0A2647',
  },
  button2: {
    backgroundColor: '#0A2647',
    padding: 8,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: '#0A2647',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  flatList: {
    marginTop: 10,
    backgroundColor: '#0A2647',
    ...Platform.select({
      web: {
        width: 800,
      },
    }),
  },
});

export default PermissionsPendingApprovalScreen;
