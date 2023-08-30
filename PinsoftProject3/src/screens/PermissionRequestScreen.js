import { View, Text, Button, Dimensions } from "react-native";
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
import axios from "axios";
import { useSelector } from "react-redux";
import { useThemeContext } from "../../ThemeContext";
import { Calendar } from "react-native-calendars";

const PermissionRequestScreen = () => {
  const { isDarkModeOn, toggleSwitch } = useThemeContext();
  const textColor = isDarkModeOn ? "white" : "black";
  const [cause, setCause] = useState("");
  const [OneDay, setOneDay] = useState(true);
  const [StartDate, setStartDate] = useState(new Date());
  const [EndDate, setEndDate] = useState(new Date());
  const [PremInfo, setPremInfo] = useState("");
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const windowWidth = Dimensions.get("window").width;

  const handleStartDateChange = (selectedDate) => {
    setStartDate(selectedDate);
    setEndDate(selectedDate);
  };

  const manId = useSelector((state) => state.data.managerId);
  console.log(manId);

  const login = useSelector((state) => state.data.login);

  const token = login.token;
  console.log(token);

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
      Alert.alert(
        "Error",
        "You can not end your day off before your start date!"
      );
      return;
    }
    const today = new Date();
    if (StartDate < today) {
      Alert.alert(
        "Error",
        "The earliest date you can choose is the day after!"
      );
      return;
    }

    const timeDiff = Math.abs(EndDate - StartDate);
    const daysDifference = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    if (!OneDay && daysDifference > 20) {
      Alert.alert("Warning", "Permission period cannot be more than 20 days");
      return;
    }

    setPremInfo({
      Cause: cause,
      startDate: StartDate.toDateString(),
      endDate: EndDate.toDateString(),
    });

    const message = `
    Cause: ${cause}
    Start Date: ${StartDate.toDateString()}
    End Date: ${EndDate.toDateString()}
  `;

    const requestData = {
      description: cause,
      startDate: StartDate,
      endDate: EndDate,
      managerId: manId,
    };

    const xhr = new XMLHttpRequest();
    xhr.open(
      "POST",
      "https://time-off-tracker-production.up.railway.app/time-off",
      true
    );
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", "Bearer " + token);

    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          Alert.alert("Request submitted successfully!", message);
        } else {
          alert("Request submission failed. Status: " + xhr.status);
        }
      }
    };

    xhr.send(JSON.stringify(requestData));
  };

  return (
    <ScrollView
      style={[
        styles.scrollView,
        { backgroundColor: isDarkModeOn ? "#171d2b" : "#f2f2f2" },
      ]}
    >
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          {/* <Text style={styles.PremInfoText}>{PremInfo}</Text> */}

          <Text style={[styles.label, { color: textColor }]}>
            Permission Cause:
          </Text>
          <TextInput
            placeholder="  Write the permission cause..."
            placeholderTextColor={"gray"}
            onChangeText={(text) => setCause(text)}
            value={cause}
            style={[styles.input, { color: textColor }]}
          />
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.switchContainer}>
            <Text style={[styles.switchLabel, { color: textColor }]}>
              Permission for one day / few days
            </Text>
            <Switch value={!OneDay} onValueChange={() => setOneDay(!OneDay)} />
          </View>
        </View>

        {OneDay ? (
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: textColor }]}>
              Permission Date:
            </Text>
            <TouchableOpacity
              style={styles.SelectButton}
              onPress={() => setShowStartDatePicker(true)}
            >
              <Text style={[styles.buttonText, { color: textColor }]}>
                Change The Starting Date
              </Text>
            </TouchableOpacity>

            <Text style={[styles.subtitle, { color: textColor }]}>
              {StartDate.toDateString()}
            </Text>
            {showStartDatePicker && (
              <>
                {windowWidth < 425 ? (
                  <DateTimePicker
                    value={StartDate}
                    mode="date"
                    display="calendar"
                    onChange={(event, selectedDate) => {
                      if (selectedDate !== undefined) {
                        handleStartDateChange(selectedDate);
                        setShowStartDatePicker(false);
                      }
                    }}
                  />
                ) : (
                  <Calendar
                    onDayPress={(day) => {
                      handleStartDateChange(new Date(day.timestamp));
                      setShowStartDatePicker(false);
                    }}
                  />
                )}
              </>
            )}
          </View>
        ) : (
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: textColor }]}>
              Permission Period Date:
            </Text>
            <TouchableOpacity
              style={styles.SelectButton}
              onPress={() => setShowStartDatePicker(true)}
            >
              <Text style={[styles.buttonText, { color: textColor }]}>
                Change The Starting Date
              </Text>
            </TouchableOpacity>

            <Text style={[styles.subtitle, { color: textColor }]}>
              {StartDate.toDateString()}
            </Text>

            {showStartDatePicker && (
              <>
                {windowWidth < 425 ? (
                  <DateTimePicker
                    value={StartDate}
                    mode="date"
                    display="calendar"
                    onChange={(event, selectedDate) => {
                      if (selectedDate !== undefined) {
                        setStartDate(selectedDate);
                        setShowStartDatePicker(false);
                      }
                    }}
                  />
                ) : (
                  <Calendar
                    onDayPress={(day) => {
                      setStartDate(new Date(day.timestamp));
                      setShowStartDatePicker(false);
                    }}
                  />
                )}
              </>
            )}

            <TouchableOpacity
              style={styles.SelectButton}
              onPress={() => setShowEndDatePicker(true)}
            >
              <Text style={[styles.buttonText, { color: textColor }]}>
                Change The Ending Date
              </Text>
            </TouchableOpacity>

            <Text style={[styles.subtitle, { color: textColor }]}>
              {EndDate.toDateString()}
            </Text>

            {showEndDatePicker && (
              <>
                {windowWidth < 425 ? (
                  <DateTimePicker
                    value={EndDate}
                    mode="date"
                    display="calendar"
                    onChange={(event, selectedDate) => {
                      if (selectedDate !== undefined) {
                        setEndDate(selectedDate);
                        setShowEndDatePicker(false);
                      }
                    }}
                  />
                ) : (
                  <Calendar
                    onDayPress={(day) => {
                      setEndDate(new Date(day.timestamp));
                      setShowEndDatePicker(false);
                    }}
                  />
                )}
              </>
            )}
          </View>
        )}

        <TouchableOpacity onPress={handleOnayPress} style={styles.button}>
          <Text style={styles.buttonText}>Send To Approval </Text>
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
    ...Platform.select({
      web: {
        alignItems: "center",
      },
    }),
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    ...Platform.select({
      web: {
        margin: 10,
      },
    }),
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    padding: 10,
    marginTop: 5,
    ...Platform.select({
      web: {
        width: 500,
      },
    }),
  },
  subtitle: {
    flex: 1,
    fontSize: 27,
    color: "white",
    alignItems: "center",
    justifyContent: "center",
    margin: 8,
    alignSelf: "center",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    color: "white",
    ...Platform.select({
      web: {
        margin: 10,
      },
    }),
  },
  switchLabel: {
    fontSize: 16,
    marginRight: 10,
    color: "white",
    alignItems: "center",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#3dd459",
    margin: 20,
    padding: 15,
    paddingHorizontal: 50,
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 25,
    elevation: 3,
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 1,
      height: 6,
    },
    shadowRadius: 30,
    ...Platform.select({
      web: {
        width: 500,
      },
    }),
  },
  SelectButton: {
    backgroundColor: "#80808011",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 10,
    shadowOpacity: 0.2,
    shadowRadius: 30,
    ...Platform.select({
      web: {
        width: 500,
      },
    }),
  },
  buttonText: {
    fontSize: 18,
    color: "white",
  },
});
export default PermissionRequestScreen;
