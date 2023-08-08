import { View, Text, Button,  } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native';

const HomeScreen = () => {
  return (
    <View style={styles.view}>
      <Text>HomeScreen</Text>
      <Button style={styles.button} title="HomeScreen" />
    </View>
  )
}

const styles = StyleSheet.create({
  view:{
    flex:1,
    alignItems:"center",
    justifyContent:"center"
  },
})


export default HomeScreen