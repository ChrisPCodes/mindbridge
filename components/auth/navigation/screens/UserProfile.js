//Avlokita's work


import React, { useState } from 'react';
import { StyleSheet, View, ImageBackground, Button, ScrollView, Text, TextInput } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import UserProfileEdit from './UserProfileEdit';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function MoreOptions({ navigation }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [userInfo, setUserInfo] = useState({
    username: 'John Doe',
    bio: 'Front-End Developer',
    followers: 1000,
    following: 500,
  });
  const [likeCounts, setLikeCounts] = useState({
    card1: 0,
    card2: 0,
    card3: 0,
  });

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

  const handleLike = (cardTitle) => {
    // Update the like count for the corresponding card
    setLikeCounts((prevCounts) => ({
      ...prevCounts,
      [cardTitle]: prevCounts[cardTitle] + 1,
    }));
  };

  return (
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
              <Card style={{ ...styles.profilecard, backgroundColor: '#CCCCFF' }}>
                <Card.Cover source={require('./random3.png')} style={{ ...styles.imagecard, opacity: 0.9 }} />
                <Card.Content>
                  <View style={{ alignItems: 'center', marginTop: 20 }}>
                    <Title style={{ fontSize: 32, fontWeight: 'bold' }}>{userInfo.username}</Title>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                    <View>
                      <Text style={{ fontSize: 23, fontWeight: 'bold', marginLeft: 60 }}>{userInfo.followers}</Text>
                      <Text style={{ fontSize: 13, marginLeft: 60 }}>Followers</Text>
                    </View>
                    <View style={{ marginLeft: 130 }}>
                      <Text style={{ fontSize: 23, fontWeight: 'bold' }}>{userInfo.following}</Text>
                      <Text style={{ fontSize: 13 }}>Following</Text>
                    </View>
                  </View>
                  <View style={{ alignItems: 'center' }}>
                    <Paragraph style={{ fontStyle: 'italic', marginTop: 10, fontSize: 18 }}>{userInfo.bio}</Paragraph>
                  </View>
                  <View style={{ alignItems: 'center', marginTop: 20 }}>
                    <Button
                      title="Edit Profile"
                      onPress={handleEdit}
                      color="#ffffff"
                    />
                  </View>
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
});
