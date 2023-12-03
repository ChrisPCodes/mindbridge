import * as React from 'react';
import { StyleSheet, View, Text, ImageBackground, FlatList, TouchableOpacity, Alert } from 'react-native';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../../../App';
import { doc, getDoc, updateDoc, collection, getDocs } from 'firebase/firestore';

export default function AddFriends({ navigation }) {
  const auth = FIREBASE_AUTH;
  const db = FIRESTORE_DB;

  const currentUser = auth.currentUser;
  const [usersList, setUsersList] = React.useState([]);

  const checkAndAddFriendsList = async () => {
    try {
      if (currentUser) {
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();

          // Check if the user already has a friends list
          if (!('friends' in userData) || !Array.isArray(userData.friends)) {
            // If not, add an empty friends list to the user's document
            await updateDoc(userDocRef, {
              friends: [],
            });
            console.log('Friends list added to user document.');
          } else {
            console.log('User already has a friends list.');
          }
        } else {
          console.error('User document not found.');
        }
      } else {
        console.error('Current user not found.');
      }
    } catch (error) {
      console.error('Error checking and adding friends list:', error);
    }
  };

  const getUsersList = async () => {
    try {
      const usersCollectionRef = collection(db, 'users');
      const querySnapshot = await getDocs(usersCollectionRef);
      const usersData = [];

      // Get the current user's friends list
      const userDocRef = doc(db, 'users', currentUser.uid);
      const userDoc = await getDoc(userDocRef);
      const currentUserFriends = userDoc.data()?.friends || [];

      querySnapshot.forEach((doc) => {
        // Exclude the current user and friends from the list
        if (doc.id !== currentUser.uid && !isFriend(doc.id, currentUserFriends)) {
          usersData.push({
            id: doc.id,
            ...doc.data(),
          });
        }
      });

      setUsersList(usersData);
    } catch (error) {
      console.error('Error fetching users list:', error);
    }
  };

  const isFriend = (userId, currentUserFriends) => {
    // Check if userId is in the friends list
    return currentUserFriends?.some((friend) => friend.uid === userId);
  };

  const handleAddFriend = async (friendId, friendName) => {
    try {
      const userDocRef = doc(db, 'users', currentUser.uid);

      // Get the current user's data
      const userDoc = await getDoc(userDocRef);
      const userData = userDoc.data();

      // Check if the friends field exists and is an array
      if (!('friends' in userData) || !Array.isArray(userData.friends)) {
        // If not, initialize it as an empty array
        userData.friends = [];
      }

      // Check if the friend is already in the user's friends list
      if (!isFriend(friendId, userData.friends)) {
        // Update the user's friends list to include the new friend
        userData.friends.push({ uid: friendId, name: friendName });

        // Update the user document in Firestore
        await updateDoc(userDocRef, {
          friends: userData.friends,
        });

        // Remove the friend from the usersList state
        setUsersList(usersList.filter((user) => user.id !== friendId));

        // Inform the user that the friend has been added
        Alert.alert('Friend Added', `You've added ${friendName} as a friend!`);
      } else {
        // Inform the user that the friend is already in their friends list
        Alert.alert('Friend Exists', `${friendName} is already in your friends list!`);
      }
    } catch (error) {
      console.error('Error adding friend:', error);
    }
  };

  React.useEffect(() => {
    checkAndAddFriendsList();
    getUsersList();
  }, []);

  const renderUserCard = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardText}>{item.name}</Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => handleAddFriend(item.id, item.name)}>
        <Text style={styles.cardAddButtonText}>Add Friend</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ImageBackground
      source={require('../../../../assets/background.png')}
      style={styles.container}>
      <Text style={styles.title}>Add Friends</Text>
      <FlatList
        data={usersList}
        keyExtractor={(item) => item.id}
        renderItem={renderUserCard}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    marginTop: 45, 
    marginBottom: 20,
    color: 'white',
  },
  card: {
    backgroundColor: 'white',
    padding: 16,
    margin: 8,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 250,
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: 'teal',
    padding: 8,
    borderRadius: 4,
  },
  cardAddButtonText: {
    fontWeight: 'bold',
    color: 'white',
  },
});
