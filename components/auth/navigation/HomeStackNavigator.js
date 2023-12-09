import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
// import MoodTracker from './path/to/MoodTracker'; // Correct the path as necessary
import MoodTracker from './screens/MoodTracker';
import MoodDetailsScreen from './screens/MoodDetailsScreen';
import MoodSummaryScreen from './screens/MoodSummaryScreen';

const HomeStack = createNativeStackNavigator();

export function HomeStackNavigator() {
  return (
    <HomeStack.Navigator initialRouteName='Home'>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="MoodTracker" component={MoodTracker} />
      <HomeStack.Screen name="MoodDetailsScreen" component={MoodDetailsScreen}/>
      <HomeStack.Screen name="MoodSummaryScreen" component={MoodSummaryScreen}/>
    </HomeStack.Navigator>
  );
}
