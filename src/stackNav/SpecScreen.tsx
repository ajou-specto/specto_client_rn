import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Spec, { SpecBase } from '../screens/Spec';
import SpecDetail, { SpecDetailBase } from '../screens/SpecDetail';
import ContestAddScreen from './ContestAddScreen';
import CertificateAddScreen from './CertificateAddScreen';
import InternAddScreen from './InternAddScreen';
import ActivityAddScreen from './ActivityAddScreen';
import ProjectAddScreen from './ProjectAddScreen';
import SpecCategorySelect from './CertificateAddScreen';
import ReviewListScreen from './ReviewListScreen';
import SpecAddComplete from '../screens/SpecAddComplete';

export type SpecScreenStackParamList = {
  Spec: undefined;
  SpecDetail: { id: number; category: string }; // id와 category 매개변수 추가
  ContestAddScreen: {
    screen: 'ContestAdd1';
    params: { id?: number; specDetail?: SpecDetailBase };
  };
  CertificateAddScreen: {
    screen: 'CertificateAdd1';
    params: { id?: number; specDetail?: SpecDetailBase };
  };
  InternAddScreen: {
    screen: 'InternAdd1';
    params: { id?: number; specDetail?: SpecDetailBase };
  };
  ActivityAddScreen: {
    screen: 'ActivityAdd1';
    params: { id?: number; specDetail?: SpecDetailBase };
  };
  ProjectAddScreen: {
    screen: 'ProjectAdd1';
    params: { id?: number; specDetail?: SpecDetailBase };
  };
  SpecCategorySelect: undefined;
  ReviewListScreen: { screen: 'ReviewListUp'; params: { specItem: SpecBase } };
  SpecAddComplete: { name: string };
};

const SpecScreenStack = createNativeStackNavigator<SpecScreenStackParamList>();

function SpecScreen() {
  return (
    <SpecScreenStack.Navigator screenOptions={{ title: '내 스펙' }}>
      <SpecScreenStack.Screen name="Spec" component={Spec} />
      <SpecScreenStack.Screen name="SpecDetail" component={SpecDetail} />
      <SpecScreenStack.Screen
        name="SpecAddComplete"
        component={SpecAddComplete}
      />
      <SpecScreenStack.Screen
        name="SpecCategorySelect"
        component={SpecCategorySelect}
      />
      <SpecScreenStack.Screen
        name="ContestAddScreen"
        component={ContestAddScreen}
        options={{ headerShown: false }}
      />
      <SpecScreenStack.Screen
        name="CertificateAddScreen"
        component={CertificateAddScreen}
        options={{ headerShown: false }}
      />
      <SpecScreenStack.Screen
        name="InternAddScreen"
        component={InternAddScreen}
        options={{ headerShown: false }}
      />
      <SpecScreenStack.Screen
        name="ActivityAddScreen"
        component={ActivityAddScreen}
        options={{ headerShown: false }}
      />
      <SpecScreenStack.Screen
        name="ProjectAddScreen"
        component={ProjectAddScreen}
        options={{ headerShown: false }}
      />
      <SpecScreenStack.Screen
        name="ReviewListScreen"
        component={ReviewListScreen}
        // options={{ headerShown: false }}
      />
    </SpecScreenStack.Navigator>
  );
}

export default SpecScreen;
