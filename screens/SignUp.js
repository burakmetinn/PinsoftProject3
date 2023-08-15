import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

const SignUpScreen = ({ navigation }) => {
  const [hidePass, setHidePass] = useState(true);
  const [textInputName, setTextInputName] = useState('');
  const [textInputEmail, setTextInputEmail] = useState('');
  const [textInputPwd, setTextInputPwd] = useState('');
  const [textInputCPwd, setTextInputCPwd] = useState('');

  const mail = useRef();
  const pwd = useRef();
  const pwd2 = useRef();

  const checkTextInput = () => {
    if (!textInputName.trim()) {
      Alert.alert('Error', 'Please enter name.');
      return;
    }
    if (!textInputEmail.trim()) {
      Alert.alert('Error', 'Please enter email.');
      return;
    }
    if (!textInputPwd.trim()) {
      Alert.alert('Error', 'Please enter password.');
      return;
    }
    if (!textInputCPwd.trim()) {
      Alert.alert('Error', 'Please enter password.');
      return;
    }
    if (textInputPwd === textInputCPwd) {
      navigation.navigate('Tabs');
    } else {
      Alert.alert('Error', 'Passwords should be the same!');
    }
  };

  return (
    <ScrollView keyboardShouldPersistTaps='handled' style={styles.scroll}>
      <View style={styles.view}>
        <Text style={styles.logo}>Sign Up</Text>
        <View>
          <View style={styles.inputs}>
            <TextInput
              placeholder='Name'
              style={{ top: 9 }}
              returnKeyType='next'
              onSubmitEditing={() => {
                mail.current.focus();
              }}
              blurOnSubmit={false}
              onChangeText={(value) => setTextInputName(value)}
            />
            <Ionicons
              name='person'
              style={{ fontSize: 15, left: 195, bottom: 7, color: '#999999' }}
            />
          </View>
          <View style={styles.inputs}>
            <TextInput
              placeholder='Email'
              style={{ top: 9 }}
              ref={mail}
              returnKeyType='next'
              onSubmitEditing={() => {
                pwd.current.focus();
              }}
              blurOnSubmit={false}
              onChangeText={(value) => setTextInputEmail(value)}
            />
            <Feather
              name='mail'
              style={{ fontSize: 15, left: 195, bottom: 7, color: '#999999' }}
            />
          </View>
          <View style={styles.inputs}>
            <TextInput
              placeholder='Password'
              style={{ top: 9 }}
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
              placeholder='Confirm Password'
              secureTextEntry={hidePass ? true : false}
              ref={pwd2}
              onChangeText={(value) => setTextInputCPwd(value)}
            />
          </View>
        </View>
        <View style={styles.btn}>
          <TouchableOpacity
            onPress={checkTextInput}
            hitSlop={{ left: 100, right: 100, top: 20, bottom: 20 }}
          >
            <Text style={styles.btnText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('LoginScreen');
          }}
        >
          <Text style={styles.btnText2}>Already have an account? Log In.</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  scroll: {
    backgroundColor: 'white',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 30,
    color: 'black',
    marginTop: 60,
    marginBottom: 50,
    fontFamily: 'Cochin-BoldItalic',
  },
  inputs: {
    width: 250,
    backgroundColor: '#ebeff2',
    borderRadius: 20,
    height: 60,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  btn: {
    padding: 20,
    backgroundColor: '#e1e5e8',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    width: 247,
    backgroundColor: "#0f396b",
  },
  btnText: {
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

export default SignUpScreen;
