import { View, Text, Button, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

const HomeScreen = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);

  const handleDateSelection = (date) => {
    // Dummy events data for demonstration
    const dummyEvents = [
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
    ];

    setSelectedDate(date);
    const filteredEvents = dummyEvents.filter((event) => event.date === date);
    setEvents(filteredEvents);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Choose your Date</Text>

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
          <ScrollView>
            {events.map((event) => (
              <View key={event.id} style={styles.eventItem}>
                <Text style={styles.eventTime}>{event.time}</Text>
                <Text style={styles.eventDescription}>{event.description}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE17B',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  calendar: {
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  eventTime: {
    fontSize: 16,
    marginRight: 10,
  },
  eventDescription: {
    flex: 1,
    fontSize: 16,
  },
});

export default HomeScreen;
