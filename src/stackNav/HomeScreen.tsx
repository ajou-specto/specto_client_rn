import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';

export type HomeScreenStackParamList = {
  Home: undefined;
};

const HomeScreenStack = createNativeStackNavigator<HomeScreenStackParamList>();

function HomeScreen() {
  return (
    <HomeScreenStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeScreenStack.Screen name="Home" component={Home} />
    </HomeScreenStack.Navigator>
  );
}

export default HomeScreen;
