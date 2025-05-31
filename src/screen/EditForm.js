import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react';
import images from '../const/images';

const EditForm = () => {
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', justifyContent: 'space-around', margin:10, alignItems: 'center', top:20}}>
      <View >
      <Text style={styles.text}>Name: Sunny</Text>
      <Text style={styles.text}>Driving Licence No: A2675428gy4Q</Text>
      </View>
        <View >
        <Image style={styles.edit} source={images.pen} />    
         </View>
      </View>
    </View>
  )
}

export default EditForm

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#fff'
},
text: {
fontSize: 16,
fontWeight: '500',
color: '#4d4c4c'
},
edit: {
    width:40,
    height: 40
}
})