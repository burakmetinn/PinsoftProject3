import React, { useState } from 'react';
import { View, Text, TouchableOpacity ,TouchableWithoutFeedback ,StyleSheet, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MyPermissionsScreenProfile = ({route}) => {
  const [isSheetVisible, setSheetVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Name 1');

  const { selectedRequester } = route.params;



  return (
    
    <View style={styles.container}>
      
      <View style={styles.infoSection}>
        <Ionicons name="person-circle"  size={100} />
        <Text style={styles.sampleName}>{selectedRequester}</Text>
      </View>
      
      <View style={styles.optionsContainer}>
        <Text style={styles.sectionTitle}>Manager</Text>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => setSheetVisible(true)}>
          <Ionicons name="person-circle" size={30}  color='gray'/>    
          <Text style={styles.managerText}>Name 1</Text>
          
        </TouchableOpacity>
      </View>

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  infoSection: {
    marginTop: 5,
    marginBottom: 20,
    flexDirection: 'row',
    marginLeft: 20,
    alignItems: 'center',
   
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: 5,
  },
  sampleName: {
    fontSize: 20,
    paddingLeft: 10,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionsContainer: {
    marginTop: 30,
    marginLeft: 30,
  },
  optionButton: {
    padding: 5,
    paddingLeft: 10,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 10,
    width: 220,
    alignItems: 'center',
    
  },
  managerText: {
    paddingRight: 90,
    paddingLeft: 10,

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

});

export default MyPermissionsScreenProfile