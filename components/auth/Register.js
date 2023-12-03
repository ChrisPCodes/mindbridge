import React, { Component } from 'react';
import { View, Button, Text, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { FIREBASE_AUTH } from '../../App';
import { FIRESTORE_DB } from '../../App';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { StackActions, CommonActions } from '@react-navigation/native'; // Import navigation utilities
import { getAuth } from 'firebase/auth';
// import { setDoc, doc } from 'firebase/firestore';
// import { FIRESTORE_DB } from '../../App';

export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
    };
  }

  // Function to sign up and send a verification email
  onSignUp = async () => {
    const auth = getAuth(); // Initialize Firebase Auth
    const db = FIRESTORE_DB;
    const { email, password, name } = this.state;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await user.updateProfile({ displayName: name });
      await sendEmailVerification(user);

      await setDoc(doc(db, 'users', user.uid), {
        name,
        email,
        isVerified: false,
      });

      alert('Registration successful! Please check your email for verification.');
    } catch (error) {
      console.error('Error during registration:', error.message);
      alert('Registration failed. Please try again.');
    }
  };

  // Function to navigate to the VerifyOTP component
  navigateToVerifyOTP = () => {
    this.props.navigation.navigate('verifyotp');
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../../assets/mdi_user.png')}
          style={styles.image}
        />

        <TextInput
          style={styles.textInput}
          placeholder="name"
          onChangeText={(name) => this.setState({ name })}
        />

        <TextInput
          style={styles.textInput}
          placeholder="email"
          onChangeText={(email) => this.setState({ email })}
        />

        <TextInput
          style={styles.textInput}
          placeholder="password"
          onChangeText={(password) => this.setState({ password })}
          secureTextEntry={true} // Password field
        />

        <TouchableOpacity style={styles.button} onPress={() => this.onSignUp()}>
          <Text style={styles.buttonText}> Sign Up </Text>
        </TouchableOpacity>

        {/* Add "Send OTP" button */}
        <TouchableOpacity style={styles.button} onPress={() => this.navigateToVerifyOTP()}>
          <Text style={styles.buttonText}> Send OTP </Text>
        </TouchableOpacity>

        <Image
          source={require('../../assets/register_hug.png')}
          style={styles.bottomImage}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#D4F0EF',
  },
  image: {
    justifyContent: 'center',
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 15,
  },
  textInput: {
    color: 'white',
    width: 200,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'teal',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    alignContent: 'center',
    textAlign: 'center',
    width: 250,
  },
  button: {
    width: 300,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: 'black',
    fontSize: 25,
    fontWeight: '400',
  },
  bottomImage: {
    overflow: 'hidden',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    width: 400,
    height: 400,
    marginTop: 20,
  },
});

export default Register;
