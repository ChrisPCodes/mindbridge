import React, {Component} from 'react'
import { View, Button, Text, Image, StyleSheet,TouchableOpacity, TextInput } from 'react-native' 
// TODO: Resolve Firebase imports 
import {FIREBASE_AUTH } from '../../App';
import { FIRESTORE_DB } from '../../App';
import { createUserWithEmailAndPassword} from '@firebase/auth';
import { setDoc, doc} from "firebase/firestore";


//With the necessary imports to create Register page 
export class Register extends Component {
    // TODO: Resolve Firebase function calls and imports 
    onSignUp(){
        const auth = FIREBASE_AUTH;
        const db = FIRESTORE_DB; 
        const { email, password, name } = this.state;
        createUserWithEmailAndPassword(auth,email,password)
        .then((result) => {
              try {
                const user = result.user; // Assuming you have access to the authenticated user
                const docRef = setDoc(doc(db, "users", user.uid), {
                  name,
                  email
                })
              } catch (e) {
                console.error("Error adding document: ", e);
              }    
        })
        .catch((error) => {
            console.log(error)
        })    
    }
  render() {
    return (
      <View style={styles.container}>
        <Image 
        // Currently Imnage is directly in the componentse folder need to figure out how to route from images folder
        source={require('../../assets/mdi_user.png')}
        style={styles.image}
        />

        <TextInput style = {styles.textInput}
                // When emptythis ist he value that's filled
                placeholder = "name"
                // JS assumes that the argugment we pass is same as the variable we created
                onChangeText={(name)=> this.setState({name})} 
            >
            </TextInput>

            <TextInput style = {styles.textInput}
                placeholder = "email"
                onChangeText={(email)=> this.setState({email})} 
            >
            </TextInput>

            <TextInput style = {styles.textInput}
                placeholder = "password"
                onChangeText={(password)=> this.setState({password})} 
            >
            </TextInput>

            <TouchableOpacity style = {styles.button}
                onPress ={()=> this.onSignUp()}>
                <Text style={styles.buttonText}> Sign Up </Text>
        </TouchableOpacity>

        <Image
          source={require('../../assets/register_hug.png')} // Replace with the path to your image
          style={styles.bottomImage}
        /> 

      </View>
    )
  }
}

export default Register;

// TODO: Create a style sheet page and import it 
// TODO: Create a style sheet page and import it 
const styles = StyleSheet.create({
  //Avlokita's work--editted changes to the layout
   
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: '#D4F0EF', 
    },

    image: {
      justifyContent: 'center',
      width: 100, // Set the width of the image
      height: 100, // Set the height of the image
      resizeMode: 'contain', // You can adjust the resizeMode as needed (cover, contain, stretch, etc.)
      marginBottom: 15,
    },
    image2: {
        justifyContent: 'center',
        width: 400, // Set the width of the image
        height: 380, // Set the height of the image
        resizeMode: 'contain', // You can adjust the resizeMode as needed (cover, contain, stretch, etc.)
        margin: 30,
      },
    title: {
      fontSize: 30, // Adjust the font size as needed
      fontWeight: 'strong', // Make the text bold
      color: 'black', // Set the text color to black
      borderWidth: 20,
      borderColor:'black'
      },
    button: {
      width: 200, // Set the width of the button
      height: 40, // Set the height of the button
      borderRadius: 20, // Adjust the border radius to make the edges rounded     //sign up button
      backgroundColor: 'white', // Button background color
      justifyContent: 'center',
      alignItems: 'center',
      marginTop:30,
      width: 300
      
      
    },
    buttonText: {
      color: 'black',
      fontSize: 25,
      fontWeight: 400,
      
      
    },textInput: {
      color:'white',
      width: 200, // Set the width of the button
      height: 40, // Set the height of the button
      borderRadius: 20, // Adjust the border radius to make the edges rounded
      backgroundColor: 'teal', // Button background color
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
      alignContent:'center',
      textAlign: 'center',
      width: 250,
      
      

   
    },
    bottomImage: {
   
      overflow: 'hidden', // This is important to clip the image
      borderBottomLeftRadius: 50, // Adjust the radius as needed
      borderBottomRightRadius: 50, // Adjust the radius as needed
      width: 400, // Set the width of the image
      height: 400,  
      marginTop: 20
     
  },
    
  });