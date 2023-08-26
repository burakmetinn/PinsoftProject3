import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const MyPermissionsScreenDetail = ({ route, navigation }) => {
  const { permission } = route.params;

  const openProfileScreen = () => {
    navigation.navigate('My Permissions Profile', {
      selectedRequester: permission.requester,
    });
  };

  const handleApprove = () => {};

  const handleDeny = () => {};

  return (
    <View style={styles.container}>
      <View style={styles.detailContainer}>
        <Text style={styles.detailTitle}>Permission period:</Text>
        <Text style={styles.detailContent}>{permission.title}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.detailTitle}>Requester:</Text>
        <Text style={styles.requesterName} onPress={openProfileScreen}>
          {permission.requester}
        </Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.detailTitle}>Reason:</Text>
        <Text style={styles.detailContent}>{permission.cause}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.detailTitle}>Status:</Text>
        <Text style={styles.status}>{permission.status}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    padding: 30,
    backgroundColor: '#ffdb58',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
    alignItems: 'center',
  },
  detailContainer: {
    marginBottom: 30,
  },
  detailTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 5,
    marginBottom: 7,
    color: '#0A2647',
  },
  detailContent: {
    fontSize: 20,
    color: '#0A2647',
  },
  status: {
    fontSize: 20,
    marginBottom: 20,
    color: '#0A2647',
  },
  requesterName: {
    fontSize: 20,
    color: '#0A2647',
  },
});

export default MyPermissionsScreenDetail;
