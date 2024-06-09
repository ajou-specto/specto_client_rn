import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ReviewCalendarScreen from '../stackNav/ReviewCalendarScreen';
import ReviewListScreen from '../stackNav/ReviewListScreen';

export type ReviewScreenParamList = {
  ReviewCalendarScreen: undefined;
  ReviewListScreen: undefined;
};

const ReviewScreenTab = createMaterialTopTabNavigator<ReviewScreenParamList>();

function ReviewScreen() {
  return (
    <ReviewScreenTab.Navigator>
      <ReviewScreenTab.Screen
        options={{ title: '캘린더' }}
        name="ReviewCalendarScreen"
        component={ReviewCalendarScreen}
      />
      <ReviewScreenTab.Screen
        options={{ title: '회고리스트' }}
        name="ReviewListScreen"
        component={ReviewListScreen}
      />
    </ReviewScreenTab.Navigator>
  );
}

export default ReviewScreen;
