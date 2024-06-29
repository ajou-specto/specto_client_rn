import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyPageScreen from '@stackNav/MyPageScreen';
// import HomeScreen from "@stackNav/HomeScreen";
import SpecScreen from '@stackNav/SpecScreen';
import ReviewScreen from './ReviewScreen';
import MyPageIcon from '@assets/images/myPage.svg';
import MyPageFocusedIcon from '@assets/images/myPage.svg';
// import HomeIcon from "@assets/images/home.svg";
// import HomeFocusedIcon from "@assets/images/home.svg";
import SpecIcon from '@assets/images/spec.svg';
import SpecFocusedIcon from '@assets/images/specFocused.svg';
import ReviewIcon from '@assets/images/review.svg';
import ReviewFocusedIcon from '@assets/images/reviewFocused.svg';
import { Platform } from 'react-native';

export type MainParamList = {
  MyPageScreen: undefined;
  HomeScreen: undefined;
  SpecScreen: undefined;
  ReviewScreen: undefined;
};

const Tab = createBottomTabNavigator();

function Main() {
  return (
    <Tab.Navigator
      initialRouteName="SpecScreen"
      screenOptions={{
        headerShown: false,
        tabBarStyle: { height: Platform.OS === 'ios' ? 76 : 56 },
        tabBarItemStyle: { marginVertical: Platform.OS === 'ios' ? 3 : 7.5 },
      }}>
      <Tab.Screen
        name="MyPageScreen"
        component={MyPageScreen}
        options={{
          tabBarLabel: '마이페이지',
          tabBarIcon: ({ focused }) =>
            focused ? <MyPageFocusedIcon /> : <MyPageIcon />,
        }}
      />
      {/* <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: "홈",
          tabBarIcon: ({ focused }) =>
            focused ? <HomeFocusedIcon /> : <HomeIcon />,
        }}
      /> */}
      <Tab.Screen
        name="SpecScreen"
        component={SpecScreen}
        options={{
          tabBarLabel: '내 스펙',
          tabBarIcon: ({ focused }) =>
            focused ? <SpecFocusedIcon /> : <SpecIcon />,
        }}
      />
      <Tab.Screen
        name="ReviewScreen"
        component={ReviewScreen}
        options={{
          headerShown: true,
          title: '내 회고',
          tabBarLabel: '내 회고',
          tabBarIcon: ({ focused }) =>
            focused ? <ReviewFocusedIcon /> : <ReviewIcon />,
        }}
      />
    </Tab.Navigator>
  );
}

export default Main;
