import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useThemeContext } from '../../../ThemeContext';

import { useSelector } from 'react-redux';
const MyPermissionsScreenDetail = ({ route, navigation }) => {
  const { permission } = route.params;
  const { isDarkModeOn, toggleSwitch } = useThemeContext();
  const textColor = isDarkModeOn ? 'white' : 'black';

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
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkModeOn ? '#171d2b' : '#f2f2f2' },
      ]}
    >
      <View style={styles.detailContainer}>
        <Text style={[styles.detailTitle, { color: textColor }]}>
          Permission period:
        </Text>
        <Text style={[styles.detailContent, { color: textColor }]}>
          {permission.title}
        </Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={[styles.detailTitle, { color: textColor }]}>
          Requester:
        </Text>
        <Text style={styles.requesterName} onPress={openProfileScreen}>
          {permission.requester}
        </Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={[styles.detailTitle, { color: textColor }]}>Reason:</Text>
        <Text style={[styles.detailContent, { color: textColor }]}>
          {permission.cause}
        </Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={[styles.detailTitle, { color: textColor }]}>Status:</Text>
        <Text style={[styles.status, { color: textColor }]}>
          {permission.status}
        </Text>
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
    backgroundColor: '#0A2647',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  detailContainer: {
    marginBottom: 30,
  },
  detailTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 5,
    marginBottom: 7,
    color: 'white',
  },
  detailContent: {
    fontSize: 16,
    color: 'white',
  },
  status: {
    fontSize: 16,
    marginBottom: 20,
    color: 'white',
  },
  requesterName: {
    fontSize: 16,
    color: '#2968b3',
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
