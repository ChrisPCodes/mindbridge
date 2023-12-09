import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, ImageBackground, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { FontProvider, FontContext } from '../../../../FontContext';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../../../App';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import UserProfileEdit from './UserProfileEdit';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MoreOptions({ route, navigation }) {
  const [userName, setUserName] = useState('');
  const user = route.params?.user;
  const userUID = user.uid;
  const db = FIRESTORE_DB;

  console.log("FROM USER EDIT PROFILE")
  console.log(userUID); 

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const userDocRef = doc(db, 'users', userUID);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userName = userDoc.data().name;
          setUserName(userName);
        }
      } catch (error) {
        console.error('Error fetching user name:', error);
      }
    };

    fetchUserName();
  }, [userUID]);

  console.log(userName); 

  const { fontSize } = useContext(FontContext);

  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const postsCollection = collection(db, 'posts');
        const postsQuery = query(postsCollection, where('userId', '==', userUID));
        const querySnapshot = await getDocs(postsQuery);

        const userPostsData = [];

        querySnapshot.forEach((doc) => {
          const post = doc.data();
          const postId = doc.id;

          userPostsData.push({
            id: postId,
            ...post,
          });
        });

        setUserPosts(userPostsData);
      } catch (error) {
        console.error('Error fetching user posts:', error);
      }
    };

    fetchUserPosts();
  }, [userUID]);

  const [isEditMode, setIsEditMode] = useState(false);
  const [userInfo, setUserInfo] = useState({
    username: 'Your Username',
    bio: 'Your Bio',
    discordId: 'Your Discord ID',
    followers: 1000,
    following: 500,
  });
  const [likeCounts, setLikeCounts] = useState({
    card1: 0,
    card2: 0,
    card3: 0,
  });
  const [friendsList, setFriendsList] = useState([]);
  const [friendsListSize, setFriendsListSize] = useState(0);
  const auth = FIREBASE_AUTH;

  useEffect(() => {
    const fetchFriendsList = async () => {
      try {
        // Fetch the user's friends list from Firestore
        const user = auth.currentUser;
        const uid = user.uid;
        const currentUserUid = uid;
        const userDocRef = doc(db, 'users', currentUserUid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          const userFriendsList = userData.friends || [];
          const size = userFriendsList.length;

          setFriendsList(userFriendsList);
          setFriendsListSize(size);
        }
      } catch (error) {
        console.error('Error fetching friends list:', error);
      }
    };

    fetchFriendsList();
  }, []); // Run once when the component mounts

  const handleSave = (updatedUserInfo) => {
    setUserInfo(updatedUserInfo);
    setIsEditMode(false);
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
  };
  const handleDiscordClick = async () => {
    // Copy the Discord username to clipboard
    Clipboard.setString(userInfo.discordId);

    // Try to open the Discord app (if installed)
    const discordAppUrl = 'https://discord.gg/2cBVaNJP'; // Discord app URL scheme
    const webUrl = 'https://discord.com/'; // Web URL as a fallback

    try {
      // Attempt to open the Discord app
      const supported = await Linking.canOpenURL(discordAppUrl);
      if (supported) {
        await Linking.openURL(discordAppUrl);
      } else {
        // If Discord app is not installed, open the web URL
        await Linking.openURL(webUrl);
      }
    } catch (error) {
      console.error('Error opening Discord app:', error);
    }
  };

  const handleLike = (cardTitle) => {
    setLikeCounts((prevCounts) => ({
      ...prevCounts,
      [cardTitle]: prevCounts[cardTitle] + 1,
    }));
  };

  return (
    <FontProvider>
      <ImageBackground source={require('./background2.png')} style={styles.container}>
        <ScrollView>
          {isEditMode ? (
            <UserProfileEdit
              initialUserInfo={userInfo}
              onSave={handleSave}
              onCancel={handleCancelEdit}
            />
          ) : (
            <SafeAreaView style={styles.container}>
              <View style={styles.container}>
                <Card style={{ ...styles.profilecard, backgroundColor: 'rgba(204, 204, 255, 0.5)' }}>
                  <Card.Cover source={require('./random3.png')} style={{ ...styles.imagecard, opacity: 0.9 }} />
                  <Card.Content>
                    <View style={styles.bioContainer}>
                      <Paragraph style={{ fontStyle: 'italic', marginTop: 0, fontSize: 18 }}>
                      </Paragraph>
                    </View>
                    <View style={{ alignItems: 'center', marginTop: 20 }}>
                      <Title style={{ fontSize: 32, fontWeight: 'bold' }}>{userName}</Title>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                      <View>
                        <Text style={{ fontWeight: 'bold', fontSize: 18, marginLeft: 155 }}>Friends</Text>
                        <Text style={{ color: 'white', fontSize: 23, fontWeight: 'bold', marginLeft: 175 }}>{friendsListSize}</Text>
                      </View>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                      <Paragraph style={{ fontStyle: 'italic', fontSize: 18 }}>{userInfo.bio}</Paragraph>
                    </View>
                    <View style={{ alignItems: 'center', }}>
                      <Button
                        title="Edit Profile"
                        onPress={handleEdit}
                        color="#ffffff"
                      />
                      <TouchableOpacity onPress={handleDiscordClick}>
                        <Text style={{ fontSize: 16, color: 'white', }}>
                          Discord ID: {userInfo.discordId}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </Card.Content>
                </Card>

                {/* Friends list card */}
                <Card style={{ ...styles.friendsCard, backgroundColor: '#pink' }}>
                  <Card.Content>
                    <Text style={styles.friendsListTitle}>Friends List:</Text>
                    <ScrollView style={styles.friendsListContainer}>
                      {friendsList.map((friend) => (
                        <View style={styles.friendsListItem} key={friend.uid}>
                          <Text style={styles.friendsCardText}>{friend.name}</Text>
                        </View>
                      ))}
                    </ScrollView>
                  </Card.Content>
                </Card>

                {/* Display user posts */}
                {userPosts.map((post) => (
                  <Card key={post.id} style={styles.card}>
                    <Card.Content>
                      <Title>{post.userDisplayName}</Title>
                      <Paragraph>{post.text}</Paragraph>

                      {/* Display comments */}
                      <View>
                        <Text style={styles.sectionTitle}>Comments:</Text>
                        {post.comments && post.comments.length > 0 ? (
                          post.comments.map((comment, index) => (
                            <View key={index} style={styles.comment}>
                              <Text style={styles.commentUser}>{comment.userDisplayName}:</Text>
                              <Text style={styles.commentText}>{comment.text}</Text>
                            </View>
                          ))
                        ) : (
                          <Text>No comments</Text>
                        )}
                      </View>

                      {/* Display likes */}
                      <View>
                        <Text style={styles.sectionTitle}>Likes: {post.likes ? post.likes.length : 0}</Text>
                      </View>
                    </Card.Content>
                  </Card>
                ))}
              </View>
            </SafeAreaView>
          )}
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
  card: {
    width: 400,
    marginVertical: 10,
    height: 300,
  },
  imagecard: {
    width: 400,
    height: 150,
    marginTop: 0,
    backgroundColor: '#CCCCFF',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
  },
  profilecard: {
    width: 400,
    marginVertical: 10,
    height: 350,
    color: 'purple',
  },
  friendsCard: {
    width: 400,
    marginVertical: 10,
    height: 170,
    marginBottom: 25,
  },
  friendsListContainer: {
    maxHeight: 200,
    fontWeight: 'bold'
  },
  friendsListTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  friendsListItem: {
    marginVertical: 5,
    fontWeight: 'bold',
  },
  friendsCardText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 18,
  },

  discordText: {
    paddingLeft: 120,
    fontSize: 16
  },

  profilecard: {

    paddingBottom: 30
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
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
});
