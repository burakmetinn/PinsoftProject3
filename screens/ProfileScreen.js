import { View, Text, Button } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native';

const ProfileScreen = () => {
  return (
    <View style={styles.view}>
      <Text>ProfileScreen</Text>
      <Button title='ProfileScreen' />
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

export default ProfileScreen