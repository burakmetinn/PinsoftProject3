import { View, Text, Button } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native';

const PermissionsPendingApprovalScreen = () => {
  return (
    <View style={styles.view}>
      <Text>PermissionsPendingAprovalScreen</Text>
      <Button title="PermissionsPendingAprovalScreen" />
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

export default PermissionsPendingApprovalScreen