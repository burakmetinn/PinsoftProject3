import { View, Text, Button } from 'react-native';
import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  Switch,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const PermissionRequestScreen = () => {
  const [cause, setCause] = useState('');
  const [OneDay, setOneDay] = useState(true);
  const [StartDate, setStartDate] = useState(new Date());
  const [EndDate, setEndDate] = useState(new Date());
  const [PremInfo, setPremInfo] = useState('');

  const handleOnayPress = () => {
    const PremDisc = `
      Permission cause: ${cause}
      Permission Type: ${OneDay ? 'One Day Permission' : 'Few Days Permission'}
      Start date: ${StartDate.toDateString()}
      End Date : ${EndDate.toDateString()}
    `;

    setPremInfo(PremDisc);
  };

  // tarihler modal ekranı üzerinden gösterilecek, seçtikten sonra input içinde karşımıza çıkacak

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          {/* <Text style={styles.PremInfoText}>{PremInfo}</Text> */}

          <Text style={styles.label}>Permission cause</Text>
          <TextInput
            placeholder='Write the Permission cause...'
            onChangeText={(text) => setCause(text)}
            value={cause}
            style={styles.input}
          />
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>
              Permission for one Day / few Days
            </Text>
            <Switch
              value={!OneDay}
              onValueChange={() => setOneDay(!OneDay)}
            />
          </View>
        </View>

        {OneDay ? (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Permission Date</Text>

            <DateTimePicker
              value={StartDate}
              mode='date'
              display='spinner'
              onChange={(event, selectedDate) => {
                if (selectedDate !== undefined) {
                  setStartDate(selectedDate);
                }
              }}
            />
          </View>
        ) : (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Permission period date </Text>
            <Text style={styles.subtitle}>Start date</Text>
            <DateTimePicker
              value={StartDate}
              mode='date'
              display='spinner'
              onChange={(event, selectedDate) => {
                if (selectedDate !== undefined) {
                  setStartDate(selectedDate);
                }
              }}
            />
            <Text style={styles.subtitle}>Expire date</Text>

            <DateTimePicker
              value={EndDate}
              mode='date'
              display='spinner'
              onChange={(event, selectedDate) => {
                if (selectedDate !== undefined) {
                  setEndDate(selectedDate);
                }
              }}
            />
          </View>
        )}

        <TouchableOpacity onPress={handleOnayPress} style={styles.button}>
          <Text style={styles.buttonText}>Send Permission to approval </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 32,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginTop: 5,
  },
  subtitle: {
    fontSize: 18,
    marginTop: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  button: {
    backgroundColor: 'green',
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
});
export default PermissionRequestScreen;
