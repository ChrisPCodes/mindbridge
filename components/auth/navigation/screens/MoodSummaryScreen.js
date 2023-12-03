
import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

// Define an array of random suggestions
const suggestions = [
    "Take a deep breath and relax. Everything will be okay.",
    "Practice gratitude by listing three things you're thankful for.",
    "Go for a walk and enjoy the fresh air.",
    "Listen to your favorite music to boost your mood.",
    "Try a new hobby or activity to keep things exciting.",
    "Read a good book to escape into another world.",
    "Reach out to a friend or loved one for a chat.",
    "Write down your thoughts and feelings in a journal.",
    "Meditate or practice mindfulness for inner peace.",
    "Cook a delicious and healthy meal for yourself.",
    "Set small goals and celebrate your achievements.",
    "Get a good night's sleep for better overall well-being.",
    "Spend time in nature and connect with the outdoors.",
    "Watch a funny movie or TV show to lift your spirits.",
    "Volunteer or help someone in need to feel fulfilled.",
    "Take a break from screens and enjoy some screen-free time.",
    "Dance like nobody's watching to release stress.",
    "Plan a future trip or adventure to have something to look forward to.",
    "Take a few moments to practice deep breathing exercises.",
  "Write down your goals and create a plan to achieve them.",
  "Start a gratitude journal and write down things you're grateful for every day.",
  "Visit a nearby park or garden to enjoy the beauty of nature.",
  "Try a new workout or exercise routine to boost your energy.",
  "Unplug from technology for a while and enjoy some digital detox.",
  "Indulge in a sweet treat or your favorite snack as a little reward.",
  "Learn something new by watching educational videos or reading articles.",
  "Call a friend or family member you haven't spoken to in a while.",
  "Explore your creative side by drawing, painting, or crafting.",
  "Visit a local museum or art gallery for some inspiration.",
  "Take a hot bath or shower to relax your muscles and unwind.",
  "Start a self-care routine with skincare and grooming.",
  "Practice mindfulness meditation to stay present and reduce stress.",
  "Plan a fun outing or adventure for the weekend.",
  "Declutter and organize a room in your home for a sense of accomplishment.",
  "Visit a library and pick up a book you've been wanting to read.",
  "Take a scenic drive to enjoy the beauty of your surroundings.",
  "Try a new type of cuisine or restaurant you've never been to.",
  "Write a letter to your future self with your goals and aspirations.",
  // Add more suggestions as needed
];

export default function MoodSummaryScreen({ route, navigation }) {
    const mood = route.params ? route.params.mood : 'No mood selected';
    const details = route.params ? route.params.details : 'No details provided';

    // State to store the random suggestion
    const [randomSuggestion, setRandomSuggestion] = useState('');

    // Function to pick a random suggestion
    const getRandomSuggestion = () => {
      const randomIndex = Math.floor(Math.random() * suggestions.length);
      setRandomSuggestion(suggestions[randomIndex]);
    };

    return (
        
        <ImageBackground
            source={require('./background2.png')} // Replace with your image path
            style={styles.imageBackground}
            resizeMode="cover"
        >
            <ScrollView>
            <View style={styles.container}>
                <Text style={styles.headerText}>Today's Mood Summary</Text>
                <Text style={styles.infoText}>Mood: {mood}</Text>
                <Text style={styles.infoText}>Details: {details}</Text>
                
                {/* Interactive box for random suggestion */}
                <TouchableOpacity 
                    style={styles.suggestionBox}
                    onPress={getRandomSuggestion}
                >
                    <Text style={styles.suggestionText}>Click for a Random Suggestion.  </Text>
                    <Text style={styles.suggestionText}>Take a Screenshot and Remember this day for what it taught you.</Text>
                </TouchableOpacity>
                
                {/* Display the random suggestion */}
                {randomSuggestion && (
                  <Text style={styles.suggestionText2}>{randomSuggestion}</Text>
                )}

                {/* Paragraph for feeling worse */}
                <View style={styles.feelingWorseBox}>
                    <Text style={styles.feelingWorseText}>
                        Feeling worse? Feeling like quitting everything? Do you just need to talk to someone? Call/Message{' '}
                        <Text style={styles.boldText}>988</Text> {/* Make 988 bold */}
                    </Text>
                </View>

                <TouchableOpacity 
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.backButtonText}>Go Back</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </ImageBackground>
       
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    headerText: {
      fontSize: 25,
      marginBottom: 20,
      fontWeight: 'bold',
      color: 'darkblue',
      textAlign: 'center',
    },
    moodDetailsBox: {
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 10,
      marginBottom: 20,
      width: '100%', // Take full width
    },
    infoText: {
      fontSize: 22,
      color: 'black',
      textAlign: 'left',
      marginBottom: 10,
      backgroundColor: 'white',
    },
    suggestionBox: {
      backgroundColor: 'pink',
      padding: 15,
      borderRadius: 10,
      marginBottom: 20,
      paddingBottom: 10,
    },
    suggestionText: {
      fontSize: 20,
      color: 'white',
      textAlign: 'center',
    },
  
    suggestionText2: {
      fontSize: 32,
      color: 'black',
      fontWeight: 'bold',
      textAlign: 'center',
      paddingBottom: 45,
      paddingTop: 35,
    },
    suggestionContainer: {
      alignItems: 'center',
    },
    suggestionAnimation: {
      width: 100,
      height: 100,
    },


    feelingWorseBox: {
      backgroundColor: 'green',
      padding: 20,
      borderRadius: 10,
      marginBottom: 5,
      paddingTop: 20,
    },
    feelingWorseText: {
      fontSize: 22,
      color: 'white',
      fontWeight: 'bold',
    },
    boldText: {
      fontWeight: 'bold',
      fontSize: 24,
    },
    backButton: {
      backgroundColor: 'skyblue',
      padding: 10,
      borderRadius: 5,
      marginTop: 20,
    },
    backButtonText: {
      color: 'white',
      fontSize: 16,
      textAlign: 'center',
    },
    imageBackground: {
      flex: 1,
      width: '100%',
      height: '100%',
    },
  });