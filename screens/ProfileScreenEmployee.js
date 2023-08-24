import React, { useState } from 'react';
import { View, Text, TouchableOpacity ,TouchableWithoutFeedback ,StyleSheet, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreenEmployee = ({navigation}) => {
  const [isSheetVisible, setSheetVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Name 1');

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setSheetVisible(false);
  };

  const handleLogout = () => {
    navigation.navigate("LoginScreen");
  }

  return (
    
    <View style={styles.container}>
      
      <View style={styles.infoSection}>
        <Ionicons name="person-circle" color="white" size={100} />
        <Text style={styles.sampleName}>Firstname Lastname</Text>
      </View>
      
      <View style={styles.optionsContainer}>
        <Text style={styles.sectionTitle}>Manager</Text>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => setSheetVisible(true)}>
          <Ionicons name="person-circle" size={30}  color='white'/>    
          <Text style={styles.managerText}>{selectedOption}</Text>
          <Ionicons style={styles.managerIcon} name="chevron-forward" size={20}  color='gray'/> 
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleLogout}  style={styles.logOutContainer}>
          <Ionicons name="log-out-outline" size={25} color="red" />
          <Text style={styles.logOutText}>Log Out</Text>
      </TouchableOpacity>

      <Modal 
        animationType="slide"
        transparent={true}
        visible={isSheetVisible}
        onRequestClose={() => setSheetVisible(false)}>
          
          <TouchableOpacity 
            style={styles.container} 
            activeOpacity={1} 
            onPressOut={() => setSheetVisible(false)}
          ></TouchableOpacity>
       
        <View style={styles.bottomSheet}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setSheetVisible(false)}>
            <Ionicons name='reorder-two-outline'  size={25}/>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[
              styles.sheetOption,
              selectedOption === 'Name 1' && styles.selectedOption,
            ]}
            onPress={() => handleOptionSelect('Name 1')}>
            <Text>Name 1</Text>
            {selectedOption === 'Name 1' && <Ionicons name='checkmark-sharp' color='green' size={15}/>}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.sheetOption,
              selectedOption === 'Name 2' && styles.selectedOption,
            ]}
            onPress={() => handleOptionSelect('Name 2')}>
            <Text>Name 2</Text>
            {selectedOption === 'Name 2' && <Ionicons name='checkmark-sharp' color='green' size={15}/>}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.sheetOption,
              selectedOption === 'Name 3' && styles.selectedOption,
            ]}
            onPress={() => handleOptionSelect('Name 3')}>
            <Text>Name 3</Text>
            {selectedOption === 'Name 3' && <Ionicons name='checkmark-sharp' color='green' size={15}/>}
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.sheetOption,
              selectedOption === 'Name 4' && styles.selectedOption,
            ]}
            onPress={() => handleOptionSelect('Name 4')}>
            <Text>Name 4</Text>
            {selectedOption === 'Name 4' && <Ionicons name='checkmark-sharp' color='green' size={15}/>}
          </TouchableOpacity>
        </View>
        
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 20,
    backgroundColor: '#0A2647',
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
    color:"white"
  },
  sampleName: {
    fontSize: 20,
    paddingLeft: 10,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    color:"white"
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
    color:"white"

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
  
  logOutContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    marginLeft: 30,
    marginTop: 50,
    width: 120,
  },
  logOutText: {
    marginLeft: 10,
    color: 'red',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default ProfileScreenEmployee
