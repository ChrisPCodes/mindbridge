// Faq.js
import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Accordion from './Accordion'; // Importing Accordion component
import { FIRESTORE_DB } from '../../App';
import { collection, onSnapshot } from 'firebase/firestore';

export default function Faq() {
  const [faqs, setFaqs] = useState([]);
  const [answers, setAnswers] = useState({});
  const [active, setActive] = useState(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const firestore = FIRESTORE_DB;
        const faqsCollection = collection(firestore, 'faqs');

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

        return () => unsubscribe();
      } catch (error) {
        console.error('Error fetching or adding FAQs:', error);
      }
    };

    fetchFaqs();
  }, []);

  return (
    <View style={styles.App}>
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
    </View>
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
    backgroundColor: '#d6e1ff',
  },
  Image: {
    overflow: 'hidden',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    width: 400,
    height: 400,
  },
});
