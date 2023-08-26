import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addLogin, addUser } from '../app/dataSlice';

const ProfileScreenManager = ({ navigation }) => {
  const login = useSelector((state) => state.data.login);

  const token = login.token;
  const dispatch = useDispatch();

  const user = useSelector((state) => state.data.user);
  const firstName = user.firstName;
  const lastName = user.lastName;
  const email = user.email;
  const role = user.role;
  useEffect(() => {
    axios
      .get('https://time-off-tracker-production.up.railway.app/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(
        (response) => {
          dispatch(addUser(response.data));
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  const makeManager = () => {
    setRole('manager');
  };

  const handleLogout = () => {
    dispatch(addLogin({}));
    dispatch(addUser({}));
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoSection}>
        <Ionicons name='person-circle' color='white' size={100} />
        <View style={styles.nameInfo}>
          <Text style={styles.firstName}>{firstName}</Text>
          <Text style={styles.lastName}>{lastName}</Text>
        </View>
      </View>

      <View style={styles.emailSection}>
        <Text style={styles.email}>Email : {email}</Text>
      </View>
      <View style={styles.emailSection}>
        <Text style={styles.email}>Role : {role}</Text>
      </View>

      <View style={styles.buttonContainer}>
        {role === 'user' && (
          <TouchableOpacity
            onPress={makeManager}
            style={styles.selectManagerButton}
          >
            <Text style={styles.buttonText}>Select Manager</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={handleLogout} style={styles.logOutContainer}>
          <Ionicons name='log-out-outline' size={25} color='red' />
          <Text style={styles.logOutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
    backgroundColor: '#0A2647',
  },
  infoSection: {
    marginTop: 30,
    marginBottom: 20,
    flexDirection: 'row',
    marginLeft: 20,
    alignItems: 'center',
  },
  nameInfo: {
    marginLeft: 10,
  },
  firstName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  lastName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  emailSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 20,
  },
  email: {
    fontSize: 18,
    marginLeft: 10,
    color: 'gray',
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  logOutContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  logOutText: {
    marginLeft: 10,
    color: 'red',
    fontWeight: 'bold',
    fontSize: 15,
  },
  selectManagerButton: {
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
  },
});

export default ProfileScreenManager;
