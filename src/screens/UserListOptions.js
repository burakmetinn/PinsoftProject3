import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  Ionicons,
  FontAwesome5,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useThemeContext } from '../../ThemeContext';

const UserListOptions = ({ route, navigation }) => {
  const { user, handleRefresh } = route.params;

  const { isDarkModeOn, toggleSwitch } = useThemeContext();
  const textColor = isDarkModeOn ? 'white' : 'black';

  const login = useSelector((state) => state.data.login);
  const token = login.token;

  const handleDelete = () => {
    axios
      .delete(
        `https://time-off-tracker-production.up.railway.app/users/${user.value}`,
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
            Alert.alert('Done!', 'Deleted');
          }
        },
        (error) => {
          console.log(error);
        }
      );
    handleRefresh();
    navigation.navigate('UserList');
  };
  const handleMakeManager = () => {
    axios
      .put(
        `https://time-off-tracker-production.up.railway.app/users/update/${user.value}`,
        {
          userRole: 'MANAGER',
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      .then(
        (response) => {
          if (response) {
            Alert.alert('Done!', 'He is a Manager Now');
          }
        },
        (error) => {
          console.log(error);
        }
      );
    handleRefresh();
    navigation.navigate('UserList');
  };
  const handleMakeAdmin = () => {
    axios
      .put(
        `https://time-off-tracker-production.up.railway.app/users/update/${user.value}`,
        {
          userRole: 'ADMIN',
        },
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
          Alert.alert('Done!', 'He is an Admin Now');
        },
        (error) => {
          console.log(error);
        }
      );
    handleRefresh();
    navigation.navigate('UserList');
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkModeOn ? '#171d2b' : '#f2f2f2' },
      ]}
    >
      <View
        style={[
          styles.container1,
          { backgroundColor: isDarkModeOn ? '#171d2b' : '#f2f2f2' },
        ]}
      >
        <View style={styles.detailContainer}>
          <Text style={[styles.detailTitle, { color: textColor }]}>
            Name Surname:
          </Text>
          <Text style={[styles.detailContent, { color: textColor }]}>
            {user.label}
          </Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={[styles.detailTitle, { color: textColor }]}>Email:</Text>
          <Text style={[styles.requesterName, { color: textColor }]}>
            {user.email}
          </Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={[styles.detailTitle, { color: textColor }]}>
            Current Role:
          </Text>
          <Text style={[styles.detailContent, { color: textColor }]}>
            {user.role}
          </Text>
        </View>
      </View>
      <View
        style={[
          styles.container2,
          { backgroundColor: isDarkModeOn ? '#171d2b' : '#f2f2f2' },
        ]}
      >
        
        <View style={styles.manAdmContainer}>
        <TouchableOpacity style={styles.buttonMan} onPress={handleMakeManager}>
          <FontAwesome5 name='crown' size={18} color='#1897ba' />
          <Text style={styles.buttonTextMan}>    Make Manager</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonAdm} onPress={handleMakeAdmin}>
          <MaterialCommunityIcons name='police-badge' size={24} color='#1864ba' />
          <Text style={styles.buttonTextAdm}>
            Make Admin
          </Text>
        </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleDelete}>
          <Ionicons name='trash-outline' size={18} color='#bd2d2d' />
          <Text style={styles.buttonText}>  Delete User</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container2: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 30,
    padding: 10,
    alignItems: 'flex-start',
    justifyContent:'flex-start',
  },
  container: {
    flex: 1,
    paddingTop: 30,
    padding: 20,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
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
    fontSize: 20,
    marginBottom: 20,
    color: 'white',
  },
  requesterName: {
    fontSize: 16,
    color: 'black',
  },
  
  manAdmContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    alignItems: 'flex-start',
    justifyContent:'space-between',
    gap: 10,
  },
  buttonTextMan: {
    color: '#1897ba',
    fontSize: 15,
    fontWeight: 'bold',
    justifyContent: 'center',
  },
  buttonTextAdm: {
    color: '#1864ba',
    fontSize: 15,
    fontWeight: 'bold',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#bd2d2d',
    fontSize: 16,
    fontWeight: 'bold',
    justifyContent: 'center'
  },
  button: {
    marginBottom: 50,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#bd2d2d',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  buttonMan: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    textAlign: 'center',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor:'#1897ba',
    height: 60,
    alignSelf: 'center',
    flexDirection: 'row',
    marginBottom: 20,
  },
  buttonAdm: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    textAlign: 'center',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor:'#1864ba',
    height: 60,
    alignSelf: 'center',
    flexDirection: 'row',
    marginBottom: 20,
  },
});

export default UserListOptions;
