import React, {Component} from 'react'
import { View, Button, TextInput, StyleSheet } from 'react-native' 
// TODO: Resolve Firebase imports 
import firebase from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

//With the necessary imports to create Register page 
export class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            name: ''
        }

        this.onSingUp = this.onSingUp.bind(this) // Need to bind to give access to components state variables 
    }

    // TODO: Resolve Firebase function calls and imports 
    onSingUp(){
        /* 
        const { email, password, name } = this.state;
        firebase.auth().createUserWithEmailAndPassword(email,password)
        .then((result) => {
            console.log(result)
        })
        .catch((error) => {
            console.log(error)
        })   
        */
    }


    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <TextInput
              // Formatting the appearance
              style={styles.input} 
              // When empty this is the value thats filled
              placeholder = "Name"
              // JS assumes that the argugment we pass is same as the variable we created 
              onChangeText={(name)=> this.setState({name})}
          />
  
          <TextInput
              style={styles.input} 
              placeholder = "Email" 
              onChangeText={(name)=> this.setState({email})}
          />
  
          <TextInput 
              style={styles.input}
              placeholder = "Password"
              secureEntry = {true} // secures passowrd text 
              onChangeText={(name)=> this.setState({password})}
          />

          <TextInput 
              style={styles.input}
              placeholder = "Confirm Password"
              secureEntry = {true} // secures passowrd text 
              onChangeText={(name)=> this.setState({password})}
          />
  
          <Button
              onPress ={()=> this.onSignUp()}
              title = "Sign Up"
           />
          
        </View>
      )
    }
  }
  
  const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });

export default Register;
