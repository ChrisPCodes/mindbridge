import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, TextInput, TouchableOpacity, Image } from 'react-native';
// import {HomeStackNavigator} from './HomeStackNavigator'; 
// import MoodTracker from './MoodTracker';
import { Card, Title, Paragraph } from 'react-native-paper';
import { FIRESTORE_DB } from '../../../../App';
import { HomeStackNavigator } from '../HomeStackNavigator';
// import MoodTracker from './MoodTracker';
import { collection, query, getDocs, doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { FontContext } from '../../../../FontContext';
import { FontProvider } from '../../../../FontContext';
import { Switch } from 'react-native'; 



export default function Home({ route, navigation}) {
  const [posts, setPosts] = useState([]);
  const [commentTexts, setCommentTexts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const db = FIRESTORE_DB;
  const user = route.params?.user;
  const [userName, setUserName] = useState(''); // State to store the user's name
  // const onTrackMoodPress = () => {
  //   navigation.navigate('MoodTracker');
  // };

  console.log("FROM HOME USER & USER NAME ");
  console.log(user);

  const [nightMode, setNightMode] = useState(false); // State for night mode toggle
  
  const toggleNightMode = () => {
    setNightMode((prevMode) => !prevMode);
  };
  

  const fetchUserName = async () => {
    try {
      const userDoc = doc(db, 'users', user.uid);
      const userDocSnapshot = await getDoc(userDoc);

      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        setUserName(userData.name);
        console.log(userName);
      }
    } catch (error) {
      console.error('Error fetching user name:', error);
    }
  };

  const fetchPosts = async () => {
    try {
      const postsCollection = collection(db, 'posts');
      const postsQuery = query(postsCollection);

      const querySnapshot = await getDocs(postsQuery);
      const postsData = [];

      querySnapshot.forEach((doc) => {
        const post = doc.data();

        if (!post.likes) {
          post.likes = [];
        }

        postsData.push({ id: doc.id, ...post });
      });

      setPosts(postsData);

      const initialCommentTexts = postsData.map(() => '');
      setCommentTexts(initialCommentTexts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleAddComment = async (postId, postIndex) => {
    try {
      const postDocRef = doc(db, 'posts', postId);

      const currentCommentText = commentTexts[postIndex];

      if (currentCommentText.trim() === '') {
        return;
      }

      await updateDoc(postDocRef, {
        comments: arrayUnion({
          userDisplayName: userName,
          text: currentCommentText,
        }),
      });

      const updatedCommentTexts = [...commentTexts];
      updatedCommentTexts[postIndex] = '';
      setCommentTexts(updatedCommentTexts);

      fetchPosts();
    } catch (error) {
      console.error('Error adding comment: ', error);
    }
  };

  const handleLikePost = async (postId) => {
    try {
      const postDocRef = doc(db, 'posts', postId);

      await updateDoc(postDocRef, {
        likes: arrayUnion(userName),
      });

      fetchPosts();
    } catch (error) {
      console.error('Error adding like: ', error);
    }
  };

  useEffect(() => {
    fetchUserName();
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter((post) => {
    return (
      post.userDisplayName && post.userDisplayName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  console.log("FROM HOME USER NAME NOT WORKING ANYMORE?????")
  console.log(userName);
  const { fontSize } = useContext(FontContext);
//add use context 

const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  Title : {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'black',
    fontSize : fontSize,
  },  
  
  commentUser : {
    fontSize: 16,
    fontWeight: 'bold',
    fontSize :  fontSize,
  },

  commentTitle : {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    fontSize :  fontSize,
  },  
  commentText : {
    fontSize: 16,
    fontSize : fontSize,
  },
 
  commentInput : {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 20,
    padding: 10,
    marginTop: 10,
    backgroundColor: 'white',
    fontSize:fontSize,
  },
  welcomeText: {
    fontSize: 20 + fontSize,
    fontWeight: 'bold',
    marginBottom: 20,
    fontSize: fontSize,
  },

  contentText: {
    fontSize: fontSize,
    textAlign: 'center',
  },
  commentButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    fontSize:  fontSize,

  },

  searchInput: {
  width: '100%',
  height: 30, // Adjusted the height
  borderWidth: 1,
  borderColor: 'gray',
  borderRadius: 20,
  padding: 10,
  marginTop: 10,
  marginBottom: 20, // Added more space between the search bar and the posts
  backgroundColor: 'white',
  fontSize: fontSize,

  },

});


  return (
    <FontProvider>
    <ImageBackground
    
    source={nightMode ? require('../../../../assets/black.png') 
    : require('../../../../assets/background.png')}
      style={styles.container}
    >
      <Text style={styles.welcomeText}>Hello {userName }, Welcome!</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search post by name..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

<View style={homeStyles.toggleContainer}>
              <Text style={homeStyles.toggleLabel}>Night Mode</Text>
              <Switch
                value={nightMode}
                onValueChange={() => setNightMode((prevMode) => !prevMode)}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={nightMode ? '#f5dd4b' : '#f4f3f4'}
              />
            </View>

      <ScrollView style={styles.postsContainer}>
        {filteredPosts.map((post, index) => (
          <Card key={index} style={styles.card}>
            <Card.Content>
              <Title style={homeStyles.Title}>{post.userDisplayName}</Title>
              <Paragraph>{post.text}</Paragraph>
              {post.comments && post.comments.length > 0 && (
                <View>
                  <Text style={homeStyles.commentTitle}>Comments:</Text>
                  {post.comments.map((comment, commentIndex) => (
                    <View key={commentIndex} style={styles.comment}>
                      <Text style={homeStyles.commentUser}>{comment.userDisplayName}:</Text>
                      <Text style={homeStyles.commentText}>{comment.text}</Text>
                    </View>
                  ))}
                </View>
              )}
              <TouchableOpacity onPress={() => handleLikePost(post.id)}>
                <Image
                  source={require('../../../../assets/heart.png')}
                  style={styles.likeButton}
                />
              </TouchableOpacity>
              <Text style={styles.likesCount}>{post.likes.length} Likes</Text>
              <TextInput
                style={homeStyles.commentInput}
                placeholder="Add a comment..."
                value={commentTexts[index]}
                onChangeText={(text) => {
                  const updatedCommentTexts = [...commentTexts];
                  updatedCommentTexts[index] = text;
                  setCommentTexts(updatedCommentTexts);
                }}
              />

              <TouchableOpacity
                style={styles.commentButton}
                onPress={() => handleAddComment(post.id, index)}
              >
                <Text style={homeStyles.commentButtonText}>Add Comment</Text>
              </TouchableOpacity>
            </Card.Content>
          </Card>
        ))}

      </ScrollView>
    </ImageBackground>
    </FontProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  likeButton: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginTop: 10,
  },
  likesCount: {
    fontSize: 16,
    marginTop: 5,
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 40,
  },
  Title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'black',
  },
  card: {
    width: 380,
    marginVertical: 10,
    height: 'auto',
  },
  commentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  comment: {
    marginVertical: 5,
  },
  commentUser: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  commentText: {
    fontSize: 16,
  },
  commentInput: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 20,
    padding: 10,
    marginTop: 10,
    backgroundColor: 'white',
  },
  commentButton: {
    width: 200,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  commentButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  searchInput: {
    width: '90%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 20,
    padding: 10,
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: 'white',
  },
  postsContainer: {
    marginBottom: 20,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40, 
  },
  toggleLabel: {
    fontSize: 16,
    color: 'black',
    marginRight: 10,
  },
});

