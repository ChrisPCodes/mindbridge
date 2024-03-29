import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, ImageBackground, ScrollView, Text, TouchableOpacity, Clipboard, Linking } from 'react-native';
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

  const { fontSize, updateFont } = useContext(FontContext);

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
  }, []);

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
    Clipboard.setString(userInfo.discordId);

    const discordAppUrl = 'https://discord.gg/2cBVaNJP';
    const webUrl = 'https://discord.com/';

    try {
      const supported = await Linking.canOpenURL(discordAppUrl);
      if (supported) {
        await Linking.openURL(discordAppUrl);
      } else {
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

  const handleFontSizeChange = (newFontSize) => {
    updateFont(newFontSize);
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
                    <View style={{ alignItems: 'center', marginTop: 10 }}>
                      <Title style={{ fontSize: 30, fontWeight: 'bold', alignSelf: "center" }}>{userName}</Title>
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
                
                <Text style ={styles.postTitle}>Posts:</Text>
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
    width: 360,
    marginVertical: 10,
    marginTop:25,
    //height: 300,
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
    //height: 200,
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
  },

  discordText:{
    paddingLeft: 120,
    fontSize: 16
  },

  profilecard:{

    paddingBottom: 30
  },

  fontSizeText :{
    color: 'white',
  },
  privacyText: {
    color: 'white',
    fontSize: 16,
  },

    fontSizeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },

  fontSizeText: {
    fontSize: 18,
    color: 'white',
    marginRight: 10,
  },

  fontSizeOptionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10, // Adjust this value to add space on the left
  },

  fontSizeOptionText: {
    fontSize: 16,
    color: 'white',
    marginRight: 10,
  },

  toggleContainer: {
    width: 40,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderWidth: 1, // Add border to the toggle container
    borderColor: 'grey', // Set border color to match the background
  },

  toggle: {
    width: 40,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  toggleKnob: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'white',
  },

  toggleActive: {
    backgroundColor: 'green',
  },

  toggleKnobActive: {
    marginLeft: 20,
  },

  toggleActiveBackground: {
    backgroundColor: 'green',
  },
  
  postTitle:{
    alignSelf: "flex-start",
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: -20,


  }
});