import React from 'react';
import { StyleSheet, View, Text, ImageBackground } from 'react-native';

export default function ForgotPassword({ navigation }) {
  return (
    <ImageBackground
      source={require('../../assets/background.png')}
      style={{ flex: 1 }}
    >
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
        <Text style={styles.aboutText}>
          MindBridge brings individuals facing similar mental health challenges together, fostering meaningful connections that go beyond the surface. It's an inclusive space where you can share experiences, lend a compassionate ear, and build friendships that understand the depths of your journey.
        </Text>
        <Text style={styles.aboutText}>
          💪 Healing Together
        </Text>
        <Text style={styles.aboutText}>
          Our app empowers users with a wealth of resources to support their healing journey. From self-help tools and expert guidance to peer-driven inspiration, we're committed to helping you and your friends heal, grow, and thrive.
        </Text>
        <Text style={styles.aboutText}>
          ❤️ You Are Not Alone
        </Text>
        <Text style={styles.aboutText}>
          With MindBridge, you'll realize you're never alone in your struggles. It's a reminder that there are others who understand, care, and stand beside you on your path to well-being.
        </Text>
        <Text style={styles.aboutText}>
          🆘 Quick Help When You Need It
        </Text>
        <Text style={styles.aboutText}>
          Sometimes, a moment of crisis requires quick solutions. MindBridge provides a quick help guide to ensure immediate support is just a tap away when you're going through something terrible.
        </Text>
        <Text style={styles.aboutText}>
          Join us in creating a community of support, empathy, and resilience. Together, we can break the stigma surrounding mental health and embrace the healing power of connection. Let's make mental health a conversation worth having.
        </Text>
        <Text style={styles.aboutText}>
          Download MindBridge today and take the first step towards a brighter, healthier future. 🌈
        </Text>
        <Text style={styles.hashtags}>
          #MentalHealthMatters #MindBridge #YouAreNotAlone #TogetherWeHeal
        </Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  aboutText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  hashtags: {
    fontSize: 14,
    color: '#555',
    marginTop: 10,
  },
});
