import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';


const MyPermissionsScreenDetail = ({ route, navigation }) => {
  const { permission } = route.params;
  

  const openProfileScreen = () => {
    navigation.navigate("My Permissions Profile", {selectedRequester: permission.requester});
  };

  const handleApprove = () => {
    
  };

  const handleDeny = () => {
    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{permission.title}</Text>
      <Text style={styles.requesterName}  onPress={openProfileScreen}>{permission.requester}</Text>
      <Text style={styles.excuse}>"Reason of the permission"</Text>
      <Text style={styles.status}>{permission.status}</Text>
      {permission.status === 'pending' && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.denyButton} onPress={handleDeny}>
            <Text style={styles.buttonText}>Deny</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.approveButton} onPress={handleApprove}>
            <Text style={styles.buttonText}>Approve</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  status: {
    fontSize: 20,
    marginBottom: 20,
  },
  excuse: {
    fontSize: 15,
    marginBottom: 20,
  },
  requesterName: {
    fontSize: 16,
    color: 'blue',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  approveButton: {
    backgroundColor: 'green',
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5,
    width: 100,
    alignItems: 'center',
  },
  denyButton: {
    backgroundColor: '#bd2d2d',
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5,
    width: 100,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default MyPermissionsScreenDetail