// Accordion.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Accordion = ({ answers, title, active, setActive }) => {
  return (
    <View style={styles.Accordion}>
      <TouchableOpacity
        style={styles.AccordionHeading}
        onPress={() => setActive(title)}
      >
        <Text style={styles.AccordionHeadingText}>{title}</Text>
        <Text style={styles.AccordionIcon}>
          {active === title ? '-' : '+'}
        </Text>
      </TouchableOpacity>

      <View
        style={active === title ? styles.AccordionContentShow : styles.AccordionContent}
      >
        <View style={styles.Container}>
          <Text style={styles.AccordionContentText}>{answers[title]}</Text>
        </View>
      </View>
    </View>
  );
};

export default Accordion;

const styles = StyleSheet.create({
  Accordion: {
    // Add your styles for the Accordion container
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  AccordionHeading: {
    // Styles for the Accordion heading
    backgroundColor: 'lavenderblush',
    borderWidth: 2,
    borderColor: 'rgb(168, 158, 207)',
    borderRadius: 15,
    padding: 10,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  AccordionHeadingText: {
    // Styles for the Accordion heading text
    backgroundColor: 'lavenderblush',
    letterSpacing: 1.2,
    fontWeight: '600',
    fontSize: 16,
  },
  AccordionIcon: {
    // Styles for the Accordion icon
    backgroundColor: 'lavenderblush',
    fontSize: 16,
  },
  AccordionContent: {
    // Styles for the Accordion content
    backgroundColor: 'lavenderblush',
    width: '90%',
    padding: 10,
    display: 'none',
    overflow: 'hidden',
    transition: 'all 600ms ease-in-out',
    borderRadius: 15,
  },
  AccordionContentShow: {
    // Styles for the Accordion content when it is shown
    display: 'flex',
    height: 'auto', // Adjust the height as needed
  },
  AccordionContentText: {
    // Styles for the text inside the Accordion content
    fontSize: 14,
    lineHeight: 22,
  },
  Container: {
    // Additional styles for the container inside the Accordion content
    borderWidth: 2,
    borderColor: 'rgb(168, 158, 207)',
  },
});
