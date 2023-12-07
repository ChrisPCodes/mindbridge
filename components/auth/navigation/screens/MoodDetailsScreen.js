// MoodDetailsScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Keyboard, ImageBackground,ScrollView } from 'react-native';

export default function MoodDetailsScreen({ route, navigation }) {
    const [details, setDetails] = useState('');
    const mood = route.params ? route.params.mood : 'No mood selected';

    const saveDetails = () => {
        // Navigate to MoodSummaryScreen with mood and details
        navigation.navigate('MoodSummaryScreen', { mood: mood, details: details });
    };

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    return (
        <ImageBackground
            source={require('./background2.png')} // Replace with your image path
            style={styles.imageBackground}
            resizeMode="cover"
        >
            <ScrollView>
            <View style={styles.container}>
                <Text style={styles.questionText}>
                    What happened today that made you feel that way?
                </Text>
                <TouchableOpacity 
                    style={styles.dismissButton}
                    onPress={dismissKeyboard}
                >
                    <Text style={styles.dismissButtonText}>Dismiss Keyboard</Text>
                </TouchableOpacity>
                <TextInput 
                    style={styles.input}
                    multiline
                    placeholder="Write about your day..."
                    value={details}
                    onChangeText={setDetails}
                />
                <TouchableOpacity 
                    style={styles.button}
                    onPress={saveDetails}
                >
                    <Text style={styles.buttonText}>Save Your Mood Board</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </ImageBackground>
    );
}

// Add your styles here


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    questionText: {
        fontSize: 30,
        marginBottom: 0,
        alignContent:'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        borderColor: 'gray',
        borderWidth: 1,
        width: '100%',
        height: 500,
        padding: 10,
        marginBottom: 20,
        textAlignVertical: 'top',
        backgroundColor:'white',
        borderRadius: 15,
    },
    button: {
        backgroundColor: 'skyblue',
        padding: 10,
        borderRadius: 5,
        width: 300
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        borderRadius: 5,
    },
    dismissButton: {
        marginTop: 10,
        backgroundColor: '#ddd',
        padding: 10,
        paddingBottom:5
    },
    dismissButtonText: {
        fontSize: 16,
    },

    imageBackground: {
        flex: 1,
        width: '100%',
        height: '100%'
    },
});
