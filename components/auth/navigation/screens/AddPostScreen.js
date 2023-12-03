import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ImageBackground, Keyboard } from 'react-native';
import { FIRESTORE_DB } from '../../../../App';
import { addDoc, collection, doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';

export default function AddPostScreen({ route }) {
  const [postText, setPostText] = useState('');
  const [imageURI, setImageURI] = useState(null);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const db = FIRESTORE_DB;
        const user = route.params?.user;
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          setUserName(userData.name);
        }
      } catch (error) {
        console.error('Error fetching user name:', error);
      }
    };

    fetchUserName();
  }, [route.params]);

  const handleCreatePost = async () => {
    try {
      const db = FIRESTORE_DB;
      const user = route.params?.user;

      const docRef = await addDoc(collection(db, 'posts'), {
        text: postText,
        imageURI: imageURI,
        userId: user.uid,
        userDisplayName: userName,
        comments: [],
        likes: [],
      });

      console.log('Post created with ID: ', docRef.id);
      setPostText('');
      setImageURI(null);
    } catch (error) {
      console.error('Error adding post: ', error);
    }
  };

  return (
    <ImageBackground
      source={require('../../../../assets/background.png')}
      style={{ flex: 1 }}
    >
      <>
        <TouchableOpacity activeOpacity={1} style={styles.container} onPress={Keyboard.dismiss}>
          <Text style={styles.title}>Add post!</Text>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.input}
              placeholder="What's on your mind?"
              value={postText}
              onChangeText={(text) => setPostText(text)}
              placeholderTextColor="black"
              multiline={true}
              onSubmitEditing={handleCreatePost}
            />
            <Image
              source={require('../../../../assets/heart.png')}
              style={styles.imageInTextBox}
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={handleCreatePost}
          >
            <Text style={styles.buttonText}>Post</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </>
    </ImageBackground>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  textInputContainer: {
    width: '100%',
    position: 'relative',
  },
  input: {
    width: '100%',
    height: 100,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 20,
    padding: 20,
    marginBottom: 10,
    marginRight: 100,
    backgroundColor: 'white',
    color: 'black',
    fontSize: 16,
  },
  imageInTextBox: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 60,
    height: 60,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: 'black',
    margin: 50,
  },
  button: {
    width: 200,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 400,
  },
});
