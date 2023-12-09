import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, ImageBackground, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { HomeStackNavigator } from '../HomeStackNavigator';
import Home from './Home';


const moodOptions = ['Happy', 'Sad', 'Angry', 'Excited', 'Tired', 'Frustrated', 'Moody', 'Depressed', 'Stressed', 'Anxious', "Relaxed", 'Hopeful', 'Bored', 'Melancholic'];

const goodMoods = new Set(['Happy', 'Excited', 'Relaxed', 'Hopeful']);
const badMoods = new Set(['Sad', 'Angry', 'Tired', 'Frustrated', 'Moody', 'Depressed', 'Stressed', 'Anxious', 'Bored', 'Melancholic']);


export default function MoodTracker({ route, navigation }) {
    const [selectedMood, setSelectedMood] = useState(null);

    useEffect(() => {
        loadMood();
    }, []);

    const loadMood = async () => {
        try {
            const savedMood = await AsyncStorage.getItem('selectedMood');
            if (savedMood) {
                setSelectedMood(savedMood);
            }
        } catch (error) {
            console.log('Failed to load the mood from storage.');
        }
    };

    const saveMood = async () => {
        try {
            await AsyncStorage.setItem('selectedMood', selectedMood);
        } catch (error) {
            console.log('Failed to save the mood to storage.');
        }
    };

    const submitMood = () => {
        if (!selectedMood) {
            Alert.alert('Please select your mood');
            return;
        }

        saveMood(); // Save mood to AsyncStorage

        navigation.navigate('MoodDetailsScreen', {
            mood: selectedMood,
            goodMoods: Array.from(goodMoods),
            badMoods: Array.from(badMoods)
        });
    };

    return (
        <ImageBackground
            source={require('./background2.png')} // Replace with your image path
            style={styles.imageBackground}
            resizeMode="cover"
        >
            <View style={styles.container}>
                <Text style={styles.headerText}>How are you feeling today?</Text>
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollViewContent}
                >
                    {moodOptions.map((mood, index) => (
                        <TouchableOpacity
                            key={index}
                            style={selectedMood === mood ? styles.selectedMoodButton : styles.moodButton}
                            onPress={() => setSelectedMood(mood)}
                        >
                            <Text style={styles.moodButtonText}>{mood}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={submitMood}
                >
                    <Button style={styles.submitButtonText}
                        title="Submit Mood"
                        onPress={() => navigation.navigate('MoodDetailsScreen', { 
                          mood: selectedMood, 
                          goodMoods: Array.from(goodMoods),
                          badMoods: Array.from(badMoods) // passing badMoods as well
                        })}
                    />

                </TouchableOpacity>
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
    headerText: {
        fontSize: 35,
        marginBottom: 40,
        marginTop: 10,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'darkblue'
    },
    scrollView: {
        width: '100%',
    },
    scrollViewContent: {
        alignItems: 'center', // Align items in the center
    },
    moodButton: {
        backgroundColor: 'gold',
        padding: 10,
        margin: 5,
        borderRadius: 5,
        minWidth: 200, // Ensure a minimum width for each button
    },
    selectedMoodButton: {
        backgroundColor: 'orange',
        padding: 10,
        margin: 5,
        borderRadius: 5,
        minWidth: 100,
    },
    moodButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20
    },
    submitButton: {
        backgroundColor: 'skyblue',
        padding: 10,
        marginTop: 20,
        borderRadius: 5,
        width: 400
    },
    submitButtonText: {
        color: 'white',
        fontSize: 28,
        textAlign: 'center',
    },

    imageBackground: {
        flex: 1,
        width: '100%',
        height: '100%'
    },
});
