import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Accordion from './Accordion.js';
import { FIRESTORE_DB } from '../../App.js';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';

export default function Faq() {
  const [faqs, setFaqs] = useState([]);
  const [answers, setAnswers] = useState({});
  const [active, setActive] = useState(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const firestore = FIRESTORE_DB;
        const faqsCollection = collection(firestore, 'faqs');

        // Subscribe to real-time updates
        const unsubscribe = onSnapshot(faqsCollection, (querySnapshot) => {
          const faqsData = [];
          const answersData = {};

          querySnapshot.forEach((doc) => {
            const { question, answer } = doc.data();
            faqsData.push({ question, answer });
            answersData[question] = answer;
          });

          setFaqs(faqsData);
          setAnswers(answersData);
        });

        // Clean up the listener when the component unmounts
        return () => unsubscribe();
      } catch (error) {
        console.error('Error fetching or adding FAQs:', error);
      }
    };

    fetchFaqs();
  }, []);

  return (
    <div className="App">
      <Image
        source={require('../../assets/register_hug.png')}
        style={styles.Image}
      />

      {faqs.length > 0 &&
        faqs.map((faq, index) => (
          <Accordion
            key={index}
            title={faq.question}
            active={active}
            setActive={setActive}
            answers={answers}
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
  },
});
