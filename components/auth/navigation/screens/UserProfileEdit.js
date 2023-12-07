//Avlokita's work

import React, { useState } from 'react';
import { View, TextInput, Button, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const UserProfileEdit = ({ initialUserInfo, onSave, onCancel }) => {
  const [userInfo, setUserInfo] = useState(initialUserInfo);

  const handleUsernameChange = (text) => {
    setUserInfo({ ...userInfo, username: text });
  };

  const handleBioChange = (text) => {
    setUserInfo({ ...userInfo, bio: text });
  };


  const handleDiscordIdChange = (text) => {
    setUserInfo({ ...userInfo, discordId: text });
  };
  const handleSave = () => {
    onSave(userInfo);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Image
          source={require('./background2.png')}
          style={styles.profileImage}
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={userInfo.username}
          onChangeText={handleUsernameChange}
        />
        <TextInput
          style={styles.input}
          placeholder="Bio"
          value={userInfo.bio}
          onChangeText={handleBioChange}
        />
        {/* Add a new input field for Discord ID */}
        <TextInput
          style={styles.input}
          placeholder="Discord ID"
          value={userInfo.discordId}
          onChangeText={handleDiscordIdChange}
        />
        <Button title="Save" onPress={handleSave} />
        <Button title="Cancel" onPress={onCancel} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75, // Adjust this to make it circular
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
    marginBottom: 10,
  },
});

export default UserProfileEdit;
