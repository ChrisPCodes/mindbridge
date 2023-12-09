import React, { Component } from 'react'
import { View, Text,TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {styles} from './Styles'
import { FontProvider } from './FontContext';


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { getFirestore} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAq3F_9cn_1tJnNP1S3Soao4TCc79dOwaE",
  authDomain: "mind-bridge-a93eb.firebaseapp.com",
  projectId: "mind-bridge-a93eb",
  storageBucket: "mind-bridge-a93eb.appspot.com",
  messagingSenderId: "1052298113718",
  appId: "1:1052298113718:web:2abbf8ed75b0c7e6f7ac17"
};

export const FIREBASE_APP = initializeApp(firebaseConfig); 
export const FIREBASE_AUTH = getAuth(FIREBASE_APP); 
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);

import LandingScreen from './components/auth/Landing';
import RegisterScreen from './components/auth/Register';
import LoginScreen from './components/auth/Login';
import ForgotPassword from './components/auth/ForgotPass';
import Container from './components/auth/navigation/container';
import AboutScreen from './components/auth/About';
import FAQ from './components/auth/Faq';
import UsageTutorial from './components/auth/UsageTutorial';

import MoodTracker from './components/auth/navigation/screens/MoodTracker';
import Home from './components/auth/navigation/screens/Home';
import { HomeStackNavigator } from './components/auth/navigation/HomeStackNavigator';
import MoodDetailsScreen from './components/auth/navigation/screens/MoodDetailsScreen';
import MoodSummaryScreen from './components/auth/navigation/screens/MoodSummaryScreen';
// import VerifyOTP from './components/auth/verifyotp';
// import OTPEntry from './components/auth/otpentry'
const Stack = createNativeStackNavigator();
const auth = FIREBASE_AUTH;

export class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loaded: false,
    }
  }

  componentDidMount(){
    onAuthStateChanged(auth,(user)=>{
      if(!user){
        this.setState({
          loggedIn: false,
          loaded:true,
        })
      }else{
        console.log("The user:", {user})
        const email = user.email;
        const uid = user.uid
        console.log("==================================================")
        console.log("From App")
        console.log("The user:", {email})
        console.log("The user:", {uid})
        console.log("==================================================")
        this.setState({
          loggedIn: true,
          loaded:true,
      })
          }
    })
  }
  
  render() {
    const {loggedIn, loaded} = this.state;

    if (!loaded){
      return(
        <View style={styles.container}>
          <Text style={styles.title}>Loading...</Text>
        </View>
      )
    }

    // Todo Switch off once sign out is implemented 
    // <Stack.Navigator initialRouteName={loggedIn ? 'Container': 'Landing'}>
    return (
      <FontProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={'Landing'}>
          <Stack.Screen name ="Landing" component        = {LandingScreen} options={{headerShown:false}}/>
          <Stack.Screen name ="Register" component       = {RegisterScreen}/>
          <Stack.Screen name ="Login" component          = {LoginScreen}/>
          <Stack.Screen name ="Container" component      = {Container} options={{headerShown:false}}/> 
          <Stack.Screen name ="ForgotPassword" component = {ForgotPassword}/>
          <Stack.Screen name ="About" component          ={AboutScreen}/>
          <Stack.Screen name ="FAQ" component          ={FAQ}/>
          <Stack.Screen name ="UsageTutorial" component          ={UsageTutorial}/>
          <Stack.Screen name="HomeScreen" component={Home} />
          <Stack.Screen name = "HomeStackNavigator" component={HomeStackNavigator}/>
          <Stack.Screen name='MoodTracker' component={MoodTracker}/>
          <Stack.Screen name="MoodDetailsScreen" component={MoodDetailsScreen} />
          <Stack.Screen name="MoodSummaryScreen" component={MoodSummaryScreen} />
       
     
        </Stack.Navigator>  

        
      </NavigationContainer>
      </FontProvider>
    );
}
}

export default App;