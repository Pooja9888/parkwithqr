import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import DrawerNavigator from '../drawer/DrawerNavigator';

const DashBoard = () => {
  return (
    <View style={{flex:1}}>
      <DrawerNavigator />
    </View>
  )
}

export default DashBoard

const styles = StyleSheet.create({})


