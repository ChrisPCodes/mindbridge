import React from 'react';
import { Text, Button, View, Image, StyleSheet,TouchableOpacity } from 'react-native';


export default function Landing({navigation}) {
  return (
    <View style={styles.container}>
      
      <Image 
      // Currently Imnage is directly in the componentse folder need to figure out how to route from images folder
      source={require('./MindBridge_Logo.png')}
      style={styles.image}
      />

      <Text style={styles.title}>Mind Bridge</Text>
      <Text> Never Walk Alone</Text>

      <TouchableOpacity style = {styles.button}
      onPress={()=> navigation.navigate('Register')}>
        <Text  style={styles.buttonText}  > Register </Text>
      </TouchableOpacity>

      <TouchableOpacity style = {styles.button}
      onPress={()=> navigation.navigate('Login')}>
        <Text style={styles.buttonText}> Login </Text>
      </TouchableOpacity>

      
      <TouchableOpacity style = {styles.button}
      onPress={()=> navigation.navigate('About')}>
        <Text style={styles.buttonText}> About  </Text>
      </TouchableOpacity>
      
    

    </View>
  )
};

// TODO: Create a style sheet page and import it 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightpink',
  },
  image: {
    justifyContent: 'center',
    width: 200, // Set the width of the image
    height: 200, // Set the height of the image
    resizeMode: 'contain', // You can adjust the resizeMode as needed (cover, contain, stretch, etc.)
  },
  title: {
    fontSize: 24, // Adjust the font size as needed
    fontWeight: 'bold', // Make the text bold
    color: 'black', // Set the text color to black
    },
  button: {
    width: 200, // Set the width of the button
    height: 40, // Set the height of the button
    borderRadius: 20, // Adjust the border radius to make the edges rounded
    backgroundColor: 'white', // Button background color
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:10,
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 400,
  },
});