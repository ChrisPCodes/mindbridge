import React from 'react';
  import { View, Text, FlatList, StyleSheet, Image, Dimensions } from 'react-native';

const trendingData = [
    {
      id: '1',
      title: 'OMG PUPPY',
      description: 'Check out this cute puppy!',
      imageUri: 'https://www.petlandflorida.com/wp-content/uploads/2022/04/shutterstock_1290320698-1-scaled.jpg',
      profilePictureUri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
    },
    {
      id: '2',
      title: 'Heck of a View',
      description: 'Guys this view is amazing...',
      imageUri: 'https://images.unsplash.com/photo-1500964757637-c85e8a162699?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2NlbmljJTIwbGFuZHNjYXBlfGVufDB8fDB8fHww&w=1000&q=80',
      profilePictureUri: 'https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg',
    },
    {
      id: '3',
      title: 'Another day in the city',
      description: 'Man this city just has the best views',
      imageUri: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2l0eXNjYXBlfGVufDB8fDB8fHww',
      profilePictureUri: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D',
    },
    // Add more trending items as needed
  ];
  
  
  const TrendingPage = () => {
    const screenWidth = Dimensions.get('window').width; // Get the screen width
    const screenHeight = Dimensions.get('window').height; // Get the screen height
  
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Trending</Text>
        <FlatList
          data={trendingData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Image
                source={{ uri: item.imageUri }}
                style={{ width: screenWidth, height: screenHeight * 0.3 }} // Adjust the height as needed
              />
              <View style={styles.textContainer}>
                <Image source={{ uri: item.profilePictureUri }} style={styles.profilePicture} />
                <View>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.description}>{item.description}</Text>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
    },
    item: {
      backgroundColor: '#f9f9f9',
      marginBottom: 16,
      borderRadius: 8,
    },
    textContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    profilePicture: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 8,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    description: {
      fontSize: 16,
    },
  });
  
  export default TrendingPage;
  