import React, { useEffect,Component }from 'react';
import { View, Button, TextInput, StyleSheet, ImageBackground, Image,  TouchableOpacity, Text } from 'react-native'; 
// TODO: Resolve Firebase imports 
import {FIREBASE_AUTH } from '../../App';
import { signInWithEmailAndPassword } from '@firebase/auth'; 

//With the necessary imports to create Register page 
export class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            name: ''
        }

        this.onLogIn = this.onLogIn.bind(this) // Need to bind to give access to components state variables 
    }

    // TODO: Resolve Firebase function calls and imports 
    onLogIn(){
        const auth = FIREBASE_AUTH;
        const { email, password } = this.state;
        signInWithEmailAndPassword(auth,email,password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          const email = user.email
          const Uid = user.uid
          console.log("============================================")
          console.log("From Login")
          console.log("I AM SIGNED IN: ", {user});
          console.log("============================================")
          
          this.props.navigation.navigate('Container', { user }); // passing user as props to Container
        })
        .catch((error) => {
            console.log(error)
        })    
        
    }

  render() {
    return (

     
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
       
        <TextInput 
            style={styles.input} 
            placeholder = "Email" 
            placeholderTextColor="white"
            onChangeText={(email)=> this.setState({email})}
        />

        <TextInput 
          style={styles.input} 
            placeholder = "Password"
            placeholderTextColor="white"
            secureEntry = {true} // secures passowrd text 
            onChangeText={(password)=> this.setState({password})}
        />
        <TouchableOpacity style = {styles.button}
            onPress ={()=> this.onLogIn()}>
        
        </TouchableOpacity>

          <TouchableOpacity
          
          onPress={() => this.onLogIn()}
        >
          <Text style={styles.buttonLogin} >Login</Text>
        </TouchableOpacity>


        <TouchableOpacity
         
          onPress={() => this.props.navigation.navigate("ForgotPassword")}
        >
          <Text style={styles.buttonForgot}>Forgot Password</Text>
        </TouchableOpacity>
          
        <Image
          source={require('../../assets/register_hug.png')} // Replace with the path to your image
          style={styles.bottomImage}
        /> 
      </View>
      
    )
  }
}

const styles = StyleSheet.create({
  input: {
    //Avlokita's work--editted changes to the layout
      width: 200, // Set the width of the button
      height: 46, // Set the height of the button
      borderRadius: 20, // Adjust the border radius to make the edges rounded
      backgroundColor: 'teal', // Button background color
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
      alignContent:'center',
      textAlign: 'center',
      width: 300,
      color:'white',
      fontSize: 25
  },
  bottomImage: {
   
    overflow: 'hidden', // This is important to clip the image
    borderBottomLeftRadius: 50, // Adjust the radius as needed
    borderBottomRightRadius: 50, // Adjust the radius as needed
    width: 400, // Set the width of the image
    height: 400,  
    marginTop: 40,
    alignSelf:'flex-end'
   
},

buttonLogin: {
  color:'white',
  width: 200,
  height: 40,
  borderRadius: 20,
  backgroundColor: 'orange',
  // justifyContent: 'center',
  // alignItems: 'center',
  marginTop: 10,
  alignSelf: 'center',
  textAlign:'center',
  fontSize: 25,
  marginTop: 50
},


buttonForgot:{
  marginTop: 20,
  fontSize: 15,
  fontStyle: 'italic'
}

});

export default Login;