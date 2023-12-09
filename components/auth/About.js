import React from 'react';
import { StyleSheet, ScrollView, View, Text, ImageBackground } from 'react-native';

export default function ForgotPassword({ navigation }) {
  return (
    <ImageBackground
      source={require('../../assets/background.png')}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={[styles.container, { backgroundColor: 'aliceblue' }]}>
          <Text style={styles.aboutText}>
            Introducing MindBridge: Your Mental Health Connection to Never Walking Alone
          </Text>
          <Text style={styles.aboutText}>
            Mental health is a journey, and no one should walk it alone. That's why we're excited to introduce MindBridge, a transformative mental health application designed to bridge the gap and connect students and users based on their unique mental health conditions.
          </Text>
          <Text style={styles.aboutText}>
            🤝 Find Your Support System
          </Text>
          {/* Add more <Text> components for each paragraph or line of text */}
          {/* ... */}
          <Text style={styles.aboutText}>
            Download MindBridge today and take the first step towards a brighter, healthier future. 🌈
          </Text>
          <Text style={styles.hashtags}>
            #MentalHealthMatters #MindBridge #YouAreNotAlone #TogetherWeHeal
          </Text>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20, // Add padding to improve readability and spacing
  },
  aboutText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  hashtags: {
    fontSize: 16,
    color: '#555',
    marginTop: 10,
    textAlign: 'center',
  },
});
