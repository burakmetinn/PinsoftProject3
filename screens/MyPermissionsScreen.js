import { View, Text, Button } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native';

const MyPermissionsScreen = () => {
  return (
    <View style={styles.view}>
      <Text>MyPermissionsScreen</Text>
      <Button title="MyPermissionsScreen" />
    </View>
  )
}

const styles = StyleSheet.create({
  view:{
    flex:1,
    alignItems:"center",
    justifyContent:"center"
  }
})

export default MyPermissionsScreen