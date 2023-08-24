import { View, Text, Button } from "react-native";
import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  Switch,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const PermissionRequestScreen = () => {
  const [cause, setCause] = useState("");
  const [OneDay, setOneDay] = useState(true);
  const [StartDate, setStartDate] = useState(new Date());
  const [EndDate, setEndDate] = useState(new Date());
  const [PremInfo, setPremInfo] = useState("");
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const handleStartDateChange = (selectedDate) => {
    setStartDate(selectedDate);
    setEndDate(selectedDate);
  };

  const WorkStartDate = new Date("2013-03-10T21:41:51.058Z");
  const handleOnayPress = () => {
    if (StartDate < WorkStartDate) {
      Alert.alert(
        "Error",
        "Permission start date cannot be before work start date!"
      );
      return;
    }

    if (EndDate < StartDate) {
      Alert.alert("Error", "Permission end date cannot be before start date!");
      return;
    }
    const today = new Date();
    if (StartDate < today) {
      Alert.alert("Error", "The earliest date you can choose:  " + Date());
      return;
    }
    const timeDiff = Math.abs(EndDate - StartDate);
    const daysDifference = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    if (!OneDay && daysDifference > 20) {
      Alert.alert("Warning", "Permission period cannot be more than 20 days");
      return;
    }

    const PremDisc = `
      Permission cause: ${cause}
      Permission Type: ${OneDay ? "One Day Permission" : "Few Days Permission"}
      Start date: ${StartDate.toDateString()}
      End Date: ${EndDate.toDateString()}
    `;

    setPremInfo(PremDisc);

    Alert.alert("", PremDisc);
  };

  console.log(StartDate);
  console.log(EndDate);

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          {/* <Text style={styles.PremInfoText}>{PremInfo}</Text> */}

          <Text style={styles.label}>Permission cause:</Text>
          <TextInput
            placeholder="Write the Permission cause..."
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
            <Switch value={!OneDay} onValueChange={() => setOneDay(!OneDay)} />
          </View>
        </View>

        {OneDay ? (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Permission Date</Text>
            <TouchableOpacity
              style={styles.SelectButton}
              onPress={() => setShowStartDatePicker(true)}
            >
              <Text style={styles.buttonText}>Change selected Start date</Text>
            </TouchableOpacity>

            <Text style={styles.subtitle}>{StartDate.toDateString()}</Text>
            {showStartDatePicker && (
              <DateTimePicker
                value={StartDate}
                mode="date"
                display="spinner"
                onChange={(event, selectedDate) => {
                  if (selectedDate !== undefined) {
                    handleStartDateChange(selectedDate);
                    setShowStartDatePicker(false);
                  }
                }}
              />
            )}
          </View>
        ) : (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Permission period date </Text>
            <TouchableOpacity
              style={styles.SelectButton}
              onPress={() => setShowStartDatePicker(true)}
            >
              <Text style={styles.buttonText}>Change selected Start date</Text>
            </TouchableOpacity>

            <Text style={styles.subtitle}>{StartDate.toDateString()}</Text>

            {showStartDatePicker && (
              <DateTimePicker
                value={StartDate}
                mode="date"
                display="spinner"
                onChange={(event, selectedDate) => {
                  if (selectedDate !== undefined) {
                    setStartDate(selectedDate);
                    setShowStartDatePicker(false);
                  }
                }}
              />
            )}

            <TouchableOpacity
              style={styles.SelectButton}
              onPress={() => setShowEndDatePicker(true)}
            >
              <Text style={styles.buttonText}>Change selected End date</Text>
            </TouchableOpacity>

            <Text style={styles.subtitle}>{EndDate.toDateString()}</Text>

            {showEndDatePicker && (
              <DateTimePicker
                value={EndDate}
                mode="date"
                display="spinner"
                onChange={(event, selectedDate) => {
                  if (selectedDate !== undefined) {
                    setEndDate(selectedDate);
                    setShowEndDatePicker(false);
                  }
                }}
              />
            )}
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
    backgroundColor: "#0A2647",
  },
  container: {
    flex: 1,
    padding: 20,
    color: "white",
  },
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    color: "white",
  },
  inputContainer: {
    marginBottom: 20,
    color: "white",
  },
  label: {
    fontSize: 25,
    color: "white",
  },
  input: {
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    marginTop: 5,
    color: "#0A2647",
    textAlign: "center",
  },
  subtitle: {
    flex: 1,
    fontSize: 35,
    color: "white",
    alignItems: "center",
    justifyContent: "center",
    margin: 8,
    marginLeft: 50,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    color: "white",
  },
  switchLabel: {
    fontSize: 16,
    marginRight: 10,
    color: "white",
    alignItems: "center",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#ffdb58",
    padding: 10,
    alignItems: "center",
    color: "#0A2647",
    borderRadius: 10,
    elevation: 5,
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 1,
      height: 6,
    },
    shadowRadius: 30,
  },
  SelectButton: {
    backgroundColor: "#ffdb58",
    alignItems: "center",
    padding: 5,
    width: 300,
    borderRadius: 10,
    color: "#0A2647",
    margin: 5,
    marginLeft: 35,
    elevation: 5,
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 1,
      height: 6,
    },
    shadowRadius: 30,
  },
  buttonText: {
    fontSize: 18,
    color: "#0A2647",
  },
});
export default PermissionRequestScreen;
