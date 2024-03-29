import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ImageBackground, Keyboard } from 'react-native';
import { FIRESTORE_DB } from '../../../../App';
import { addDoc, collection, doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { FontProvider } from '../../../../FontContext';
import { FontContext } from '../../../../FontContext';
import { Switch } from 'react-native';

export default function AddPostScreen({ route }) {

  console.log("FROM POST SCREEN FOR TESTING THE HOME PAGE:")
  const user = route.params?.user;
  console.log(user);
  const { fontSize } = useContext(FontContext); //add use context
  const [nightMode, setNightMode] = useState(false);

  const toggleNightMode = () => {
    setNightMode(previousState => !previousState);
  };
  

  const dynamicStyles = StyleSheet.create({
    title: {
      fontSize: fontSize,
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
      fontSize: fontSize,
    },
    buttonText: {
      color: 'black',
      fontSize:  fontSize,
      fontWeight: '400'},

    textInputContainer: {
      width: '100%',
      position: 'relative',
      fontSize: fontSize
    
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
    fontSize: fontSize
    
    },

  });

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
    <FontProvider> 
    <ImageBackground
      source={nightMode ? require('../../../../assets/black.png') 
    : require('../../../../assets/background.png')}
      style={{ flex: 1 }}
    >
      <>
      <View style={styles.toggleContainer}>
        <Text style={styles.toggleLabel}>Night Mode</Text>
        <Switch
          value={nightMode}
          onValueChange={toggleNightMode}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={nightMode ? '#f5dd4b' : '#f4f3f4'}
        />
      </View>
        <TouchableOpacity activeOpacity={1} style={styles.container} onPress={Keyboard.dismiss}>
          <Text style={dynamicStyles.title}>Add post!</Text>
          <View style={dynamicStyles.textInputContainer}>
            <TextInput
              style={dynamicStyles.input}
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
            style={dynamicStyles.button}
            onPress={handleCreatePost}
          >
            <Text style={dynamicStyles.buttonText}>Post</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </>
    </ImageBackground>
    </FontProvider>
  ); //add font provider
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
