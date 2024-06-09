import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ContestAdd1 from '../screens/ContestAdd1';
import ContestAdd2 from '../screens/ContestAdd2';
import ContestAdd3 from '../screens/ContestAdd3';
import SpecAddComplete from '../screens/SpecAddComplete';
import { SpecDetailBase } from '@screens/SpecDetail';

export type ContestAddScreenStackParamList = {
  ContestAdd1: { id?: number; specDetail?: SpecDetailBase }; // 수정된 부분
  ContestAdd2: { id?: number; specDetail?: SpecDetailBase; name: string };
  ContestAdd3: {
    id?: number;
    specDetail?: SpecDetailBase;
    name: string;
    host: string;
    startDate: string | null;
    endDate: string | null;
    field: string;
    contents: string | null;
  };
  SpecAddComplete: { name: string };
};

const ContestAddScreenStack =
  createNativeStackNavigator<ContestAddScreenStackParamList>();

function ContestAddScreen() {
  return (
    <ContestAddScreenStack.Navigator screenOptions={{ title: '공모전/수상' }}>
      <ContestAddScreenStack.Screen
        name="ContestAdd1"
        component={ContestAdd1}
      />
      <ContestAddScreenStack.Screen
        name="ContestAdd2"
        component={ContestAdd2}
      />
      <ContestAddScreenStack.Screen
        name="ContestAdd3"
        component={ContestAdd3}
      />
      <ContestAddScreenStack.Screen
        name="SpecAddComplete"
        component={SpecAddComplete}
      />
    </ContestAddScreenStack.Navigator>
  );
}

export default ContestAddScreen;
