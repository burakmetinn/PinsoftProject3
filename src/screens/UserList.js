import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  RefreshControl,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { useThemeContext } from '../../ThemeContext';
import { useNavigation } from '@react-navigation/native';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const login = useSelector((state) => state.data.login);
  const textColor = isDarkModeOn ? 'white' : 'black';
  const { isDarkModeOn, toggleSwitch } = useThemeContext();
  const navigation = useNavigation();

  const token = login.token;
  const [refreshing, setRefreshing] = useState(false);


  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  };

  useEffect(() => {
    axios
      .get('https://time-off-tracker-production.up.railway.app/users/get-all', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      .then(
        (response) => {
          const transformedData = response.data.map((user) => ({
            label: `${user.firstName} ${user.lastName}`,
            value: user.id,
            role: user.role,
            email: user.email,
          }));
          setUsers(transformedData);
        },
        (error) => {
          console.log(error);
          alert('Make sure you Selected Your manager');
        }
      );
  }, [refreshing]);
  const openUserDetails = (user) => {
    navigation.navigate('user list options', { user , handleRefresh });
  };

  const renderItem = ({ item }) => (
    <View>
      <TouchableOpacity
        onPress={() => {
          openUserDetails(item);
        }}
        style={[styles.item, { borderColor: isDarkModeOn ? 'white' : 'black' }]}
      >
        <View style={styles.arCont}>
          <Text
            style={[styles.text, { color: isDarkModeOn ? 'white' : 'black' }]}
          >
            Name Surname :
          </Text>
          <Text
            style={[styles.textSm, { color: isDarkModeOn ? 'white' : 'black' }]}
          >
            {item.label}
          </Text>
        </View>
        <View style={styles.arCont}>
          <Text
            style={[styles.text, { color: isDarkModeOn ? 'white' : 'black' }]}
          >
            Role :
          </Text>
          <Text
            style={[styles.textSm, { color: isDarkModeOn ? 'white' : 'black' }]}
          >
            {item.role}
          </Text>
        </View>

        <View style={styles.arCont}>
          <Text
            style={[styles.text, { color: isDarkModeOn ? 'white' : 'black' }]}
          >
            Email Address :
          </Text>
          <Text
            style={[styles.textSm, { color: isDarkModeOn ? 'white' : 'black' }]}
          >
            {item.email}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkModeOn ? '#171d2b' : '#f2f2f2' },
      ]}
    >
      <View style={styles.header}>
        <Text
          style={[styles.title, { color: isDarkModeOn ? 'white' : 'black' }]}
        >
          Company employer List {'\n'}
          choose an employee to see the options
        </Text>
      </View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        style={styles.flatList}
        data={users}
        renderItem={renderItem}
        keyExtractor={(item) => item.value}
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 30,
    backgroundColor: '#0A2647',
    ...Platform.select({
      web: {
        alignItems: 'center',
      },
    }),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  item: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    marginTop: 20,
    marginBottom: 5,
    margin: 50,
    height: 80,
    width: 300,
    borderRadius: 10,
    borderWidth: 1.5,
    fontWeight: 'bold',
  },
  arCont: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'scroll',
  },
  text: {
    fontSize: 17,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textSm: {
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  darkMode: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 30,
  },
  flatList: {
    ...Platform.select({
      web: {
        width: 800,
      },
    }),
  },
});

export default UserList;
