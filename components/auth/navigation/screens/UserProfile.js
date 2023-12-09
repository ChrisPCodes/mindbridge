//Avlokita's work

import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, ImageBackground, Button, ScrollView, Text, TextInput } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import UserProfileEdit from './UserProfileEdit';
import { FontProvider, FontContext } from '../../../../FontContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../../../App';
import { doc, getDoc } from 'firebase/firestore';
import { Clipboard, Linking, TouchableOpacity } from 'react-native';


export default function MoreOptions({ route, navigation }) {
  const { fontSize, updateFont } = useContext(FontContext);
  const [userName, setUserName] = useState(''); // State to store the user's name
  const [isPrivate, setIsPrivate] = useState(false); // State for the privacy toggle
  const user = route.params?.user;
  const userUID = user.uid;
  console.log("FROM THE USER PROFILE LOGG")
  console.log(userUID)

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        // Reference to the user document in Firestore using the UID
        const userDocRef = doc(db, 'users', userUID);

        // Fetch the user document
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          // If the document exists, update the state with the user's name
          const userName = userDoc.data().name;
          setUserName(userName);
        }
      } catch (error) {
        console.error('Error fetching user name:', error);
      }
    };

    fetchUserName();
  }, [userUID]); // Run when the component mounts or when userUID changes

  console.log("NAME FROM THE USER  PROFILE");
  console.log(userName);
  
 

  const dynamicStyles = StyleSheet.create({
    title: {
      fontSize: fontSize,
      fontWeight: 'bold',
    },
    followers: {
      fontSize: fontSize,
      alignContent: 'center',
      // fontWeight: 'bold',
    },

    following: {
      fontSize: fontSize,
      alignContent: 'center',

    },
    bio: {
      fontSize: fontSize,
      fontStyle: 'italic',
      marginTop: 5,
    },
    // buttonText: {
    //   fontSize: fontSize,
    //   marginRight: 10,
    // },
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [userInfo, setUserInfo] = useState({
   
    discordId: 'Mind Bridge Discord Channel',
    isPrivate: false, // isPrivate value if user wants to enable privacy settings
  });

  const [likeCounts, setLikeCounts] = useState({
    card1: 0,
    card2: 0,
    card3: 0,
  });
  const [friendsList, setFriendsList] = useState([]);
  const [friendsListSize, setFriendsListSize] = useState(0);
  const auth = FIREBASE_AUTH;
  const db = FIRESTORE_DB;

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
  const handleFontSizeChange = (newFontSize) => {
    updateFont(newFontSize);
  };

  const handlePrivacyToggle = () => {
    setIsPrivate((prevIsPrivate) => !prevIsPrivate);
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
                  <Text style={{ fontWeight: 'bold', fontSize: 18,  marginLeft: 155 }}>Friends</Text>
                  <Text style={{ color:'white', fontSize: 23, fontWeight: 'bold', marginLeft: 175 }}>{friendsListSize}</Text>
                </View>
              </View>
                  <View style={{ alignItems: 'center', marginTop: 20 }}>
                 

                      <TouchableOpacity onPress={handleDiscordClick}>
                    <Text style={{  fontSize: 16, color: 'white', }}>
                       {userInfo.discordId}
                      </Text>
                    </TouchableOpacity>
                  </View>
          {/* Font Size Options */}
          <View style={styles.fontSizeContainer}>
            <Text style={styles.fontSizeText}>Change Font Size:</Text>
            <View style={styles.fontSizeOptionsContainer}>
              <TouchableOpacity onPress={() => handleFontSizeChange(15)}>
                <Text style={styles.fontSizeOptionText}>Small</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleFontSizeChange(18)}>
                <Text style={styles.fontSizeOptionText}>Medium</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleFontSizeChange(20)}>
                <Text style={styles.fontSizeOptionText}>Large</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Privacy Toggle */}
          <View style={styles.privacyToggleContainer}>
            <Text style={styles.privacyText}>Privacy:</Text>
            <TouchableOpacity onPress={handlePrivacyToggle}>
              <View style={[styles.toggleContainer, isPrivate && styles.toggleActive]}>
                <View style={[styles.toggle, isPrivate && styles.toggleActiveBackground]}>
                  <View style={[styles.toggleKnob, isPrivate && styles.toggleKnobActive]} />
                </View>
              </View>
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
            </View>
          </SafeAreaView>
        )}
        {/* Liked button example */}
        <Card style={styles.card}>
          <Card.Cover source={require('./random.png')} />
          <Card.Content>
            <Title>{userInfo.username}</Title>
            <Paragraph>
              Success is peace of mind, which is a direct link to life
            </Paragraph>
            <Button
              title={`Liked (${likeCounts.card1})`}
              onPress={() => handleLike('card1')}
              color="darkred" // Text color is red
            />
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Cover source={require('./random2.png')} />
          <Card.Content>
            <Title>{userInfo.username}</Title>
            <Paragraph>
              Success is peace of mind, which is a direct link to life
            </Paragraph>
            <Button
              title={`Liked (${likeCounts.card2})`}
              onPress={() => handleLike('card2')}
              color="darkred" // Text color is red
            />
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Cover source={require('./random.png')} />
          <Card.Content>
            <Title>{userInfo.username}</Title>
            <Paragraph>
              When the sun shines, we'll shine together,
              Told you I'll be here forever,
              Said I'll always be your friend
            </Paragraph>
            <Button
              title={`Liked (${likeCounts.card3})`}
              onPress={() => handleLike('card3')}
              color="darkred" // Text color is red
            />
          </Card.Content>
        </Card>
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
    fontSize: 16,
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
});