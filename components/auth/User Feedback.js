import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';

const FeedbackApp = () => {
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmission = () => {
    if (feedback.trim() === '') {
      Alert.alert('Error', 'Please enter your feedback.');
      return;
    }

    // You can handle the submission logic here (e.g., send the feedback to a server).
    // For this example, we'll just show a confirmation message.
    setSubmitted(true);
  };

  return (
    <View style={styles.container}>
      {!submitted ? (
        <View>
          <Text style={styles.heading}>Submit Feedback</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your feedback here"
            onChangeText={(text) => setFeedback(text)}
            value={feedback}
            multiline
          />

          <Button title="Submit" onPress={handleSubmission} />
        </View>
      ) : (
        <View>
          <Text style={styles.heading}>Feedback Submitted</Text>
          <Text style={styles.submittedText}>
            Thank you for your feedback:
          </Text>
          <Text style={styles.feedbackText}>{feedback}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 150,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    fontSize: 16,
  },
  submittedText: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  feedbackText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default FeedbackApp;