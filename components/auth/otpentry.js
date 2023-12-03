import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

class OTPEntry extends Component {
  state = {
    enteredOTP: '', // State to store the entered OTP
  };

  verifyOTP = () => {
    const { confirmation, phoneNumber } = this.props.route.params;
    const { enteredOTP } = this.state;

    if (enteredOTP === confirmation) {
      Alert.alert('Success', 'OTP verified successfully.');
      // You can perform further actions upon successful OTP verification.
    } else {
      Alert.alert('Error', 'Invalid OTP. Please try again.');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Enter OTP</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter OTP"
          onChangeText={(text) => this.setState({ enteredOTP: text })}
        />
        <Button title="Verify OTP" onPress={this.verifyOTP} />
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

export default OTPEntry;
