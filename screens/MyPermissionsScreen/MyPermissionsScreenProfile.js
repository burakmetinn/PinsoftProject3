import React, { useState } from 'react';
import { View, Text, TouchableOpacity ,TouchableWithoutFeedback ,StyleSheet, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeContext } from '../../ThemeContext';

const MyPermissionsScreenProfile = ({route}) => {
  const [isSheetVisible, setSheetVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Name 1');

  const { selectedRequester } = route.params;

  const { isDarkModeOn, toggleSwitch } = useThemeContext();
  const textColor = isDarkModeOn ? 'white' : 'black';




  return (
    
    <View style={[styles.container,  {backgroundColor: isDarkModeOn? '#171d2b' :'#f2f2f2'}]}>
      
      <View style={styles.infoSection}>
        <Ionicons name="person-circle"  size={100} color={textColor} />
        <Text style={[styles.sampleName,  {color: textColor}]}>{selectedRequester}</Text>
      </View>
      
      <View style={styles.optionsContainer}>
        <Text style={[styles.optionsTitle,  {color: textColor}]}>Manager</Text>
        <View
          style={styles.optionButton}>
          <Ionicons name="person-circle" size={30}  color='gray'/>    
          <Text style={[styles.managerText,  {color: textColor}]}>Name 1</Text>
          
        </View>
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
  optionsTitle: {
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