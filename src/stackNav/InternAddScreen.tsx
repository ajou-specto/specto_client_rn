import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InternAdd1 from '../screens/InternAdd1';
import InternAdd2 from '../screens/InternAdd2';
import SpecAddComplete from '../screens/SpecAddComplete';
import { SpecDetailBase } from '@screens/SpecDetail';

export type InternAddScreenStackParamList = {
  InternAdd1: { id?: number; specDetail?: SpecDetailBase };
  InternAdd2: {
    id?: number;
    specDetail?: SpecDetailBase;
    name: string;
    company: string;
    work: string;
    startDate: string | null;
    endDate: string | null;
    contents: string | null;
  };
  SpecAddComplete: { name: string };
};

const InternAddScreenStack =
  createNativeStackNavigator<InternAddScreenStackParamList>();

function InternAddScreen() {
  return (
    <InternAddScreenStack.Navigator screenOptions={{ title: '인턴' }}>
      <InternAddScreenStack.Screen name="InternAdd1" component={InternAdd1} />
      <InternAddScreenStack.Screen name="InternAdd2" component={InternAdd2} />

      <InternAddScreenStack.Screen
        name="SpecAddComplete"
        component={SpecAddComplete}
      />
    </InternAddScreenStack.Navigator>
  );
}

export default InternAddScreen;
