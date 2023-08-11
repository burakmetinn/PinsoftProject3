import { View, Text, Button } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native';

const PermissionRequestScreen = () => {
  return (
    <View style={styles.view}>
      <Text>PermissionRequestScreen</Text>
      <Button title="PermissionRequestScreen" />
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

export default PermissionRequestScreen