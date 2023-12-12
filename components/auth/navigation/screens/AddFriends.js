import * as React from 'react';
import { StyleSheet, View, Text, ImageBackground, FlatList, TouchableOpacity, TextInput, Alert } from 'react-native';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../../../App';
import { doc, getDoc, updateDoc, collection, getDocs } from 'firebase/firestore';

export default function AddFriends({ navigation }) {
  const auth = FIREBASE_AUTH;
  const db = FIRESTORE_DB;

  const currentUser = auth.currentUser;
  const [usersList, setUsersList] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState('');

  const checkAndAddFriendsList = async () => {
    try {
      if (currentUser) {
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();

          if (!('friends' in userData) || !Array.isArray(userData.friends)) {
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

      const userDocRef = doc(db, 'users', currentUser.uid);
      const userDoc = await getDoc(userDocRef);
      const currentUserFriends = userDoc.data()?.friends || [];

      querySnapshot.forEach((doc) => {
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
    return currentUserFriends?.some((friend) => friend.uid === userId);
  };

  const handleAddFriend = async (friendId, friendName) => {
    try {
      const userDocRef = doc(db, 'users', currentUser.uid);

      const userDoc = await getDoc(userDocRef);
      const userData = userDoc.data();

      if (!('friends' in userData) || !Array.isArray(userData.friends)) {
        userData.friends = [];
      }

      if (!isFriend(friendId, userData.friends)) {
        userData.friends.push({ uid: friendId, name: friendName });

        await updateDoc(userDocRef, {
          friends: userData.friends,
        });

        setUsersList(usersList.filter((user) => user.id !== friendId));

        Alert.alert('Friend Added', `You've added ${friendName} as a friend!`);
      } else {
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

  const filteredUsers = usersList.filter((user) => {
    return user.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <ImageBackground
      source={require('../../../../assets/background.png')}
      style={styles.container}>
      <Text style={styles.title}>Add Friends</Text>
      
      <TextInput
        style={styles.searchInput}
        placeholder="Search friends by name..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <FlatList
        data={filteredUsers}
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
});
