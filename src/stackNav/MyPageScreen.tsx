import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyPage from '../screens/MyPage';
import ProfileChange from '../screens/ProfileChange';
import Privacy from '@screens/Privacy';

export type MyPageScreenStackParamList = {
  MyPage: undefined;
  ProfileChange: undefined;
  Privacy: undefined;
};

const MyPageScreenStack =
  createNativeStackNavigator<MyPageScreenStackParamList>();

function MyPageScreen() {
  return (
    <MyPageScreenStack.Navigator
      screenOptions={{ headerShown: false, title: '마이페이지' }}>
      <MyPageScreenStack.Screen name="MyPage" component={MyPage} />
      <MyPageScreenStack.Screen
        name="ProfileChange"
        component={ProfileChange}
      />
      <MyPageScreenStack.Screen
        name="Privacy"
        component={Privacy}
        options={{ headerShown: true, title: '개인정보처리방침' }}
      />
    </MyPageScreenStack.Navigator>
  );
}

export default MyPageScreen;
