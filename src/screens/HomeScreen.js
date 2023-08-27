import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Calendar } from 'react-native-calendars';
import { useThemeContext } from '../../ThemeContext';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { addPermList } from '../app/dataSlice';

const HomeScreen = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);
  const { isDarkModeOn, toggleSwitch } = useThemeContext();
  const textColor = isDarkModeOn ? 'white' : 'black';
  const [dummyEvents, setDummyEvents] = useState([
    { id: 1, date: '2023-08-15', time: '10:00 AM', description: 'Meeting' },
    { id: 2, date: '2023-08-15', time: '12:00 AM', description: 'Sport' },
    { id: 3, date: '2023-08-15', time: '13:00 PM', description: 'Running' },
    { id: 4, date: '2023-08-15', time: '14:00 PM', description: 'Swimming' },
    {
      id: 5,
      date: '2023-08-15',
      time: '15:00 pM',
      description: 'Feed the dog',
    },
    {
      id: 6,
      date: '2023-08-15',
      time: '16:00 PM',
      description: 'Feed your self',
    },
    { id: 7, date: '2023-08-16', time: '12:30 PM', description: 'dinner' },
    { id: 8, date: '2023-08-17', time: '6:00 AM', description: 'Gym' },
  ]);

  const handleDateSelection = (date) => {
    setSelectedDate(date);
    const filteredEvents = dummyEvents.filter((event) => event.date === date);
    setEvents(filteredEvents);
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
          const transformedData = response.data
            .filter((perm) => perm.timeOffType === 'APPROVED')
            .map((prem) => {
              const StartDate = new Date(prem.startDate);
              const EndDate = new Date(prem.endDate);
              const formattedStartDate = StartDate.toISOString().split('T')[0];
              const formattedEndDate = EndDate.toISOString().split('T')[0];
              return {
                id: prem.id,
                name: `${prem.employee.firstName} ${prem.employee.lastName}`,
                date: formattedStartDate,
                endDate: formattedEndDate,
                time: prem.startTime,
                description: prem.description,
              };
            });
          setDummyEvents(transformedData);

          if (response) {
            console.log('Succses');
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: isDarkModeOn ? '#171d2b' : '#f2f2f2' },
      ]}
    >
      <Text style={[styles.heading, { color: textColor }]}>
        Permission calender
      </Text>

      <Calendar
        onDayPress={(day) => handleDateSelection(day.dateString)}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: 'blue' },
        }}
        style={styles.calendar}
      />

      {selectedDate && (
        <View style={styles.eventsContainer}>
          <Text style={styles.selectedDateText}>
            Selected Date: {selectedDate}
          </Text>
          <ScrollView showsHorizontalScrollIndicator={false}>
            {events.map((event) => (
              <View key={event.id} style={styles.eventItem}>
                <Text style={styles.eventName}>{event.name}</Text>
                <Text style={styles.eventDescription}>{event.description}</Text>
                <Text style={styles.eventDate}>
                  Ends At : {event.endDate}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A2647',
    padding: 20,
    marginBottom: 20,
    ...Platform.select({
      web: {},
    }),
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'white',
  },
  calendar: {
    padding: 5,
    marginBottom: 20,
    borderRadius: 10,
    elevation: 3,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 1,
      height: 6,
    },
    shadowRadius: 30,
    ...Platform.select({
      web: {
        width: 850,
        left: 310,
      },
    }),
  },
  eventsContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    elevation: 3,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 1,
      height: 6,
    },
    shadowRadius: 30,
    ...Platform.select({
      web: {
        width: 850,
        left: 310,
      },
    }),
  },
  selectedDateText: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 10,
  },
  listContainer: {
    flex: 1,
  },
  eventItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#ccc',
    marginBottom: 10,
    textAlign:'center',
  },
  eventName: {
    fontSize: 16,
    padding:10,
    marginRight: 10,
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
  eventDescription: {
    fontSize: 16,
    padding:10,
    textAlign:'center',
    marginRight: 10,
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
  eventDate: {
    
    fontSize: 16,
  },
});

export default HomeScreen;
