import React, { useState } from 'react';
import { View, Text, TouchableOpacity ,TouchableWithoutFeedback ,StyleSheet, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeContext } from '../../../ThemeContext';

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
  
});

export default MyPermissionsScreenProfile