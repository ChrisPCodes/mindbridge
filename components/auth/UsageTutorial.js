// UsageTutorial.js
import React, { useState, useEffect } from 'react';
import { ImageBackground, View, StyleSheet } from 'react-native';
import Accordion from './Accordion'; // Importing Accordion component
import { FIRESTORE_DB } from '../../App';
import { collection, onSnapshot } from 'firebase/firestore';

export default function UsageTutorial() {
  const [tutorialSteps, setTutorialSteps] = useState([]);
  const [answers, setAnswers] = useState({});
  const [active, setActive] = useState(null);

  useEffect(() => {
    const fetchTutorialSteps = async () => {
      try {
        const firestore = FIRESTORE_DB;
        const tutorialCollection = collection(firestore, 'usageTutorial');

        const unsubscribe = onSnapshot(tutorialCollection, (querySnapshot) => {
          const tutorialData = [];
          const answersData = {};

          querySnapshot.forEach((doc) => {
            const { question, answer } = doc.data();
            tutorialData.push({ question, answer });
            answersData[question] = answer;
          });

          setTutorialSteps(tutorialData);
          setAnswers(answersData);
        });

        return () => unsubscribe();
      } catch (error) {
        console.error('Error fetching or adding Usage Tutorial steps:', error);
      }
    };

    fetchTutorialSteps();
  }, []);

  return (
    <ImageBackground
      source={require('../../assets/register_hug.png')}
      style={styles.ImageBackground}
    >
      <View style={styles.App}>
        {tutorialSteps.length > 0 &&
          tutorialSteps.map((step, index) => (
            <Accordion
              key={index}
              title={step.question}
              answers={answers}
              active={active}
              setActive={setActive}
            />
          ))}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  App: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    minHeight: '100%',
    backgroundColor: 'rgba(214, 225, 255, 0.8)',
  },
  ImageBackground: {
    overflow: 'hidden',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    width: '100%',
    height: '100%',
    marginTop: 40,
    justifyContent: 'center',
  },
});
