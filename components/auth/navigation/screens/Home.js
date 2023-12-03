import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, Button, TouchableOpacity} from 'react-native';
// import {HomeStackNavigator} from './HomeStackNavigator'; 
// import MoodTracker from './MoodTracker';
import { Card, Title, Paragraph } from 'react-native-paper';
import { FIRESTORE_DB } from '../../../../App';
import { collection, query, getDocs, doc, getDoc } from 'firebase/firestore';
import { HomeStackNavigator } from '../HomeStackNavigator';
// import MoodTracker from './MoodTracker';

export default function Home({ route, navigation  }) {
  const [posts, setPosts] = useState([]);
  const db = FIRESTORE_DB;
  const user = route.params?.user;
  const [userName, setUserName] = useState(''); // State to store the user's name
  // const onTrackMoodPress = () => {
  //   navigation.navigate('MoodTracker');
  // };

  // Function to fetch the user's name
  const fetchUserName = async () => {
    try {
      const userDoc = doc(db, 'users', user.uid);
      const userDocSnapshot = await getDoc(userDoc);

      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        setUserName(userData.name);
      }
    } catch (error) {
      console.error('Error fetching user name:', error);
    }
  }

  useEffect(() => {
    fetchUserName();
  }, []); // Fetch the user's name when the component mounts

  // Function to fetch posts
  const fetchPosts = async () => {
    const postsCollection = collection(db, 'posts');
    const postsQuery = query(postsCollection);

    try {
      const querySnapshot = await getDocs(postsQuery);
      const postsData = [];

      querySnapshot.forEach((doc) => {
        const post = doc.data();
        postsData.push(post);
      });

      setPosts(postsData);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }

  useEffect(() => {
    // Fetch posts when the component mounts
    fetchPosts();
  }, []); // The empty dependency array ensures it runs once when the component mounts

  // This effect will run whenever a new post is added
  useEffect(() => {
    if (route.params?.newPostAdded) {
      // Fetch posts again to update the list
      fetchPosts();
    }
  }, [route.params?.newPostAdded]);

  return (
    <ImageBackground
      source={require('../../../../assets/background.png')}
      style={styles.container}
    >
      <Text style={styles.welcomeText}>Hello {userName || 'user'}, Welcome!</Text>
      <Button 
        title="Track your Mood"
        onPress={()=> navigation.navigate('MoodTracker')}
      />
      
      <ScrollView>
        {posts.map((post, index) => (
          <Card key={index} style={styles.card}>
            <Card.Content>
              <Title>{post.userDisplayName}</Title>
              <Paragraph>{post.text}</Paragraph>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'black',
    margin: 20,
    marginBottom: 40,
  },
  card: {
    width: 400,
    marginVertical: 10,
    height: 'auto', // Allow the card height to adjust based on content
  },
  description: {
    fontSize: 16, // Adjust the font size for descriptions
  },
});
