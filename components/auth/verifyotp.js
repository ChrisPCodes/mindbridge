import React, { Component } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Alert } from 'react-native';
import { CommonActions } from '@react-navigation/native';


// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey('YOUR_SENDGRID_API_KEY'); // Replace with your SendGrid API key

class VerifyOTP extends Component {
  state = {
    email: '', // State to store the email address
    confirmation: null, // Add state to hold the confirmation object
  };

  sendOtpToEmail = (email, otp) => {
    const msg = {
      to: email,
      from: 'hellomindbridge@gmail.com', // Replace with your sender email address
      subject: 'OTP Verification',
      text: `Your OTP is: ${otp}`,
    };

    return sgMail.send(msg);
  };

  sendOTP = async () => {
    const { email } = this.state;

    if (!email) {
      Alert.alert('Error', 'Please enter your email address.');
      return;
    }

    // Simulate generating an OTP (replace with your OTP generation logic)
    const otp = Math.floor(100000 + Math.random() * 900000);

    try {
      // Send OTP to the entered email address
      await this.sendOtpToEmail(email, otp);

      // Update the state with the sent OTP
      this.setState({ confirmation: { otp, email } });
    } catch (error) {
      console.error('Error sending OTP:', error);
      Alert.alert('Error', 'Failed to send OTP. Please try again.');
    }
  };

  navigateToOTPEntry = () => {
    const { navigation } = this.props;
    const { confirmation } = this.state;

    if (!confirmation) {
      Alert.alert('Error', 'OTP not sent. Please send OTP first.');
      return;
    }

    navigation.dispatch(
      CommonActions.navigate({
        name: 'OTPEntry',
        params: { confirmation }, // Pass confirmation and email in navigation params
      })
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>OTP Verification</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Email Address"
          onChangeText={(text) => this.setState({ email: text })}
        />
        <Button title="Send OTP" onPress={this.sendOTP} />
        <Button title="Go to OTP Entry" onPress={this.navigateToOTPEntry} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    fontSize: 18,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
  },
});

export default VerifyOTP;
