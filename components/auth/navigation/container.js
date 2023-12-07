import * as React from 'react'
import { StyleSheet, View, Text, ScrollView} from "react-native"
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Home from './screens/Home';
import UserProfile from './screens/UserProfile';
import QHG from './screens/QHG';
import AddPostScreen from './screens/AddPostScreen';
import { HomeStackNavigator } from './HomeStackNavigator';
import Communitytopic from './screens/Communitytopic';
import AddFriends from './screens/AddFriends';
import MoodTracker from './screens/MoodTracker';

const Tab = createMaterialTopTabNavigator();

export default function Container({ route, navigation }) {
  const user = route.params?.user;
  const email = user.email;
  const Uid = user.uid;
  console.log('USER OBJECT FROM THE CONTAINER', { user });
  console.log('USER FROM THE CONTAINER:', { email });
  console.log('USER UID FROM THE CONTAINER:', { Uid });

  return (
    <View style={styles.container}>
      <NavigationContainer independent={true}>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <Tab.Navigator
            screenOptions={{ headerShown: false }}
            tabBarOptions={{
              scrollEnabled: true,
              tabStyle: { width: 'auto' },
            }}
          >
            <Tab.Screen
              name="Home"
              component={HomeStackNavigator}
              initialParams={{ user }}
            />
             <Tab.Screen name="Track your Mood" component={MoodTracker} />
            <Tab.Screen name="Community" component={Communitytopic} />
            <Tab.Screen name="Add Friends" component={AddFriends} />
            <Tab.Screen
              name="Add Post"
              component={AddPostScreen}
              initialParams={{ user }}
            />
            <Tab.Screen name="User Profile" component={UserProfile} />
            <Tab.Screen name="Quick Help Guide" component={QHG} />
          </Tab.Navigator>
        </ScrollView>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // Add a light pink background color
  },
  scrollViewContainer: {
    flexGrow: 1,
    paddingTop: '10%',
    paddingBottom: '5%',
    backgroundColor: 'white'
  },
  temp: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
});
