import React, { useState, useEffect } from 'react';
import { Image, StyleSheet } from 'react-native';
import Accordion from './Accordion.js';
import { FIRESTORE_DB } from '../../App.js';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';

export default function UsageTutorial() {
  const [tutorialSteps, setTutorialSteps] = useState([]);
  const [answers, setAnswers] = useState({});
  const [active, setActive] = useState(null);

  useEffect(() => {
    const fetchTutorialSteps = async () => {
      try {
        const firestore = FIRESTORE_DB;
        const tutorialCollection = collection(firestore, 'usageTutorial');

        // Subscribe to real-time updates
        const unsubscribe = onSnapshot(tutorialCollection, (querySnapshot) => {
          const tutorialData = [];
          const answersData = {};

          querySnapshot.forEach((doc) => {
            const { question, answer } = doc.data();
            tutorialData.push({ question, answer });
            answersData[question] = answer;  // Populate the answers object
          });

          setTutorialSteps(tutorialData);
          setAnswers(answersData);  // Set the answers state
        });

        // Clean up the listener when the component unmounts
        return () => unsubscribe();
      } catch (error) {
        console.error('Error fetching or adding Usage Tutorial steps:', error);
      }
    };

    fetchTutorialSteps();
  }, []);

  return (
    <div className='App'>
      <Image
        source={require('../../assets/register_hug.png')}
        style={styles.Image}
      />

      {tutorialSteps.length > 0 &&
        tutorialSteps.map((step, index) => (
          <Accordion
            key={index}
            title={step.question}
            answers={answers}  // Pass the answers state
            active={active}
            setActive={setActive}
          />
        ))}
    </div>
  );
}

const styles = StyleSheet.create({
  Image: {
    overflow: 'hidden',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    width: 400,
    height: 400,
    marginTop: 40,
    justifyContent: 'center',
  },
});
