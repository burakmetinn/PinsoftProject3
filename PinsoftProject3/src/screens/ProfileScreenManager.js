import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Modal,
  Switch,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { addUser, addManagerId, addLogin } from '../app/dataSlice';
import axios from 'axios';
import { useThemeContext } from '../../ThemeContext';
import Entypo from 'react-native-vector-icons/Entypo';

const ProfileScreenEmployee = ({ navigation }) => {
  const { isDarkModeOn, toggleSwitch } = useThemeContext();
  const [textInputPwd, setTextInputPwd] = useState('');
  const [textInputNPwd, setTextInputNPwd] = useState('');
  const [hidePass, setHidePass] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const login = useSelector((state) => state.data.login);

  const token = login.token;
  const dispatch = useDispatch();

  const pwd = useRef();
  const pwd2 = useRef();

  const checkTextInput = () => {
    if (!textInputPwd.trim()) {
      Alert.alert('Error', 'Please enter password.');
      return;
    }
    if (!textInputNPwd.trim()) {
      Alert.alert('Error', 'Please enter password.');
      return;
    }
    if (textInputPwd !== textInputNPwd) {
      changePasswordHandler();
    } else {
      Alert.alert('Error', 'Passwords should not be the same!');
    }
  };

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

  const changePasswordHandler = () => {
    const xhr = new XMLHttpRequest();
    xhr.open(
      'POST',
      'https://time-off-tracker-production.up.railway.app/users/password-changes',
      true
    );
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', `Bearer ${token}`);

    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          console.log(xhr.responseText); // Response from the server
          Alert.alert('Done!', 'Your Password Changed Successfully');
        } else {
          console.log(xhr.statusText); // Status text in case of error
          Alert.alert('Failed!', 'Try Again');
        }
      }
    };

    const requestData = JSON.stringify({
      oldPassword: textInputPwd,
      newPassword: textInputNPwd,
    });

    xhr.send(requestData);
  };

  const handleLogout = () => {
    dispatch(addLogin({}));
    dispatch(addManagerId(''));
    dispatch(addUser({}));
    navigation.navigate('LoginScreen');
  };

  const textColor = isDarkModeOn ? 'white' : 'black';

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkModeOn ? '#171d2b' : '#f2f2f2' },
      ]}
    >
      <View style={styles.infoSection}>
        <Ionicons
          name='person-circle'
          style={styles.icon}
          color={textColor}
          size={100}
        />
        <Text style={[styles.sampleName, { color: textColor }]}>
          {firstName} {lastName}
        </Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={[styles.sampleInfoTitle, { color: textColor }]}>
          Email Address
        </Text>
        <Text style={[styles.sampleInfo, { color: textColor }]}>{email}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={[styles.sampleInfoTitle, { color: textColor }]}>Role</Text>
        <Text style={[styles.sampleInfo, { color: textColor }]}>{role}</Text>
      </View>

      <View style={styles.darkMode}>
        <Text style={{ color: textColor, fontWeight: 'bold', fontSize: 16 }}>
          Dark Theme {' '}
        </Text>
        <Switch value={isDarkModeOn} onValueChange={toggleSwitch}></Switch>
      </View>

      <TouchableOpacity
        onPress={() => {
          setIsModalVisible(!isModalVisible);
        }}
        style={styles.btn1}
      >
        
        <Text style={[styles.btnText,{color: isDarkModeOn ? '#d2d2d2' : '#04277f'}]}>Change Password   </Text>
        <Feather name='edit-3' size={20} color={isDarkModeOn ? '#d2d2d2' : '#04277f'} />
      </TouchableOpacity>

      <TouchableOpacity onPress={handleLogout} style={styles.logOutContainer}>
        <Ionicons name='log-out-outline' size={25} color='red' />
        <Text style={styles.logOutText}>Log Out</Text>
      </TouchableOpacity>

      <Modal visible={isModalVisible} animationType='fade' transparent>
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
          onPress={handleCloseModal}
        >
          <View
            style={{ padding: 20, backgroundColor: 'white', borderRadius: 20 }}
            onPress={() => {
              setIsModalVisible(true);
            }}
          >
            <View style={styles.inputs}>
              <TextInput
                placeholder='Password'
                style={{
                  top: 9,
                  ...Platform.select({
                    web: {
                      outline: 'none',
                    },
                  }),
                }}
                ref={pwd}
                returnKeyType='next'
                onSubmitEditing={() => {
                  pwd2.current.focus();
                }}
                blurOnSubmit={false}
                secureTextEntry={hidePass ? true : false}
                onChangeText={(value) => setTextInputPwd(value)}
              />
              <TouchableOpacity style={styles.lockButton}>
                <Entypo
                  name={hidePass ? 'lock' : 'lock-open'}
                  style={styles.lockBtn}
                  onPress={() => {
                    setHidePass(!hidePass);
                  }}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.inputs}>
              <TextInput
                style={{
                  ...Platform.select({
                    web: {
                      outline: 'none',
                    },
                  }),
                }}
                placeholder='Confirm Password'
                secureTextEntry={hidePass ? true : false}
                ref={pwd2}
                onChangeText={(value) => setTextInputNPwd(value)}
              />
            </View>
            <TouchableOpacity
              style={styles.btn}
              activeOpacity={0.7}
              onPress={checkTextInput}
              hitSlop={{ left: 100, right: 100, top: 20, bottom: 20 }}
            >
              <Text style={styles.btnText1}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 10,
    backgroundColor: '#0A2647',
  },
  infoSection: {
    marginTop: 5,
    marginBottom: 30,
    marginLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
    ...Platform.select({
      web: {
        alignSelf: 'flex-start',
        flexDirection: 'row',
      },
    }),
  },
  optionsTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white',
  },

  sampleName: {
    fontSize: 20,
    paddingLeft: 10,
    fontWeight: 'bold',
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  sampleInfoTitle: {
    fontSize: 17,
    color: 'white',
    alignSelf: 'flex-start',
    flexDirection: 'row',
    fontWeight: 'bold',
  },

  sampleInfo: {
    fontSize: 15,
    color: 'white',
    alignSelf: 'flex-start',
    flexDirection: 'row',
    marginBottom: 30,
    top: 5,
  },

  infoContainer: {
    marginLeft: 30,
    marginBottom: 15,
  },

  optionsContainer: {
    marginLeft: 30,
    marginBottom: 20,
    ...Platform.select({
      web: {
        right: 650,
      },
    }),
  },
  optionButton: {
    padding: 5,
    paddingLeft: 10,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 5,
    width: 220,
    alignItems: 'center',
  },

  managerText: {
    paddingRight: 90,
    paddingLeft: 10,
    color: 'white',
  },

  containerBg: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 10,
  },

  bottomSheet: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 12,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  closeButton: {
    alignSelf: 'center',
    marginBottom: 20,
  },

  sheetOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#dbdbdb',
  },

  logOutContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    marginLeft: 30,
    marginTop: 70,
    width: 120,
    ...Platform.select({
      web: {},
    }),
  },
  logOutText: {
    marginLeft: 10,
    color: 'red',
    fontWeight: 'bold',
    fontSize: 15,
  },

  darkMode: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 30,
  },
  inputs: {
    width: 250,
    backgroundColor: '#ebeff2',
    borderRadius: 20,
    height: 60,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
    ...Platform.select({
      web: {
        outlineStyle: 'none',
      },
    }),
  },
  btn: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    width: 247,
    backgroundColor: '#0f396b',
  },
  btn1: {
    padding: 30,
    marginTop: 15,
    width: 230,
    flexDirection: 'row',
  },
  btnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  btnText1: {
    color: 'white',
    fontSize: 16,
  },
  button: {
    fontSize: 120,
  },
  btnText2: {
    paddingTop: 20,
    fontWeight: 'bold',
  },

  lockBtn: {
    fontSize: 15,
    left: 195,
    bottom: 7,
    color: '#999999',
    width: 20,
    marginLeft: 0,
    padding: 0,
  },
  lockButton: {
    width: 20,
  },
});

export default ProfileScreenEmployee;
