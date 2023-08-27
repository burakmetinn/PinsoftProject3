import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useSelector } from 'react-redux';
const MyPermissionsScreenDetail = ({ route, navigation }) => {
  const { permission } = route.params;

  const openProfileScreen = () => {
    navigation.navigate('My Permissions Profile', {
      selectedRequester: permission.requester,
    });
  };

  const login = useSelector((state) => state.data.login);
  const token = login.token;

  const handleDelete = () => {
    axios
      .delete(
        `https://time-off-tracker-production.up.railway.app/time-off/${permission.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      .then(
        (response) => {
          if (response) {
            console.log('Deleted');
          }
        },
        (error) => {
          console.log(error);
        }
      );
    navigation.navigate('MyPermissionsScreenList');
  };

  const handleDeny = () => {};

  return (
    <View style={styles.container}>
      <View style={styles.detailContainer}>
        <Text style={styles.detailTitle}>Permission period:</Text>
        <Text style={styles.detailContent}>{permission.title}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.detailTitle}>Requester:</Text>
        <Text style={styles.requesterName} onPress={openProfileScreen}>
          {permission.requester}
        </Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.detailTitle}>Reason:</Text>
        <Text style={styles.detailContent}>{permission.cause}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.detailTitle}>Status:</Text>
        <Text style={styles.status}>{permission.status}</Text>
      </View>
      {permission.status !== 'PENDING' && (
        <TouchableOpacity style={styles.button} onPress={handleDelete}>
          <Text style={styles.buttonText}>Delete Request</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    padding: 30,
    backgroundColor: '#ffdb58',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
    alignItems: 'center',
  },
  detailContainer: {
    marginBottom: 30,
  },
  detailTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 5,
    marginBottom: 7,
    color: '#0A2647',
  },
  detailContent: {
    fontSize: 20,
    color: '#0A2647',
  },
  status: {
    fontSize: 20,
    marginBottom: 20,
    color: '#0A2647',
  },
  requesterName: {
    fontSize: 20,
    color: '#0A2647',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#0A2647',
    padding: 8,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: '#0A2647',
    width: 127,
  },
});

export default MyPermissionsScreenDetail;
