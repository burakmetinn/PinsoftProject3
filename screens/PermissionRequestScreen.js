import { View, Text, Button } from "react-native";
import React, { useState } from "react";
import { StyleSheet, TextInput, Switch, TouchableOpacity, ScrollView } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const PermissionRequestScreen = () => {
  const [izinNedeni, setIzinNedeni] = useState("");
  const [tekGunIzin, setTekGunIzin] = useState(true);
  const [baslangicTarihi, setBaslangicTarihi] = useState(new Date());
  const [bitisTarihi, setBitisTarihi] = useState(new Date());
  // const [izinBilgileri, setIzinBilgileri] = useState("");


  const handleOnayPress = () => {
    // const izinBilgiMetni = `
    //   İzin Nedeni: ${izinNedeni}
    //   İzin Türü: ${tekGunIzin ? "Tek Gün İzin" : "Çoklu Gün İzin"}
    //   Başlangıç Tarihi: ${baslangicTarihi.toDateString()}
    //   Bitiş Tarihi: ${bitisTarihi.toDateString()}
    // `;
  
    // setIzinBilgileri(izinBilgiMetni);
  };



  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
        {/* <Text style={styles.izinBilgileriText}>{izinBilgileri}</Text> */}

          <Text style={styles.label}>İzin Nedeni</Text>
          <TextInput
            placeholder="İzin nedeninizi girin..."
            onChangeText={(text) => setIzinNedeni(text)}
            value={izinNedeni}
            style={styles.input}
          />
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Tek Gün İzin / Çoklu Gün İzin</Text>
            <Switch
              value={!tekGunIzin}
              onValueChange={() => setTekGunIzin(!tekGunIzin)}
            />
          </View>
        </View>

        {tekGunIzin ? (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>İzin Tarihi</Text>

            <DateTimePicker
              value={baslangicTarihi}
              mode="date"
              display="spinner"
              onChange={(event, selectedDate) => {
                if (selectedDate !== undefined) {
                  setBaslangicTarihi(selectedDate);
                }
              }}
            />
          </View>
        ) : (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>İzin Tarihi Aralığı</Text>
            <Text style={styles.subtitle}>Başlangıç Tarihi</Text>
            <DateTimePicker
              value={baslangicTarihi}
              mode="date"
              display="spinner"
              onChange={(event, selectedDate) => {
                if (selectedDate !== undefined) {
                  setBaslangicTarihi(selectedDate);
                }
              }}
            />
            <Text style={styles.subtitle}>Bitiş Tarihi</Text>

            <DateTimePicker
              value={bitisTarihi}
              mode="date"
              display="spinner"
              onChange={(event, selectedDate) => {
                if (selectedDate !== undefined) {
                  setBitisTarihi(selectedDate);
                }
              }}
            />
          </View>
        )}

        <TouchableOpacity onPress={handleOnayPress} style={styles.button}>
          <Text style={styles.buttonText}>İzni Onaya Gönder</Text>
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
    backgroundColor:"#fff",
  },
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
  subtitle:{
fontSize:18,
marginTop:16,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  switchLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  button: {
    backgroundColor: "green",
    padding: 10,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "white",
  },
});
export default PermissionRequestScreen;
