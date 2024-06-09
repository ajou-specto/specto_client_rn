import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ActivityAdd1 from '../screens/ActivityAdd1';
import ActivityAdd2, { ProofFileBase } from '../screens/ActivityAdd2';
import ActivityAdd3 from '../screens/ActivityAdd3';
import SpecAddComplete from '../screens/SpecAddComplete';
// import SpecSend from "@screens/SpecSend";
import { SpecDetailBase } from '@screens/SpecDetail';

export type ActivityAddScreenStackParamList = {
  ActivityAdd1: { id?: number; specDetail?: SpecDetailBase };
  ActivityAdd2: { id?: number; specDetail?: SpecDetailBase; name: string };
  ActivityAdd3: {
    id?: number;
    specDetail?: SpecDetailBase;
    name: string;
    host: string;
    startDate: string | null;
    endDate: string | null;
    field: string;
    contents: string | null;
    // proofFile: ProofFileBase | null;
  };
  SpecAddComplete: { name: string };
  // SpecSend: {
  //   specPostReq: {
  //     name: string;
  //     category: string;
  //     startDate: Date | string | null;
  //     endDate: Date | string | null;
  //     contents: string | null;
  //     detail: {
  //       host: string;
  //       field: string;
  //       motivation: string;
  //       goal: string;
  //       direction: string;
  //     };
  //   };
  //   // fileBase64: string;
  //   fileUri: string;
  //   fileName: string;
  // };
};

const ActivityAddScreenStack =
  createNativeStackNavigator<ActivityAddScreenStackParamList>();

function ActivityAddScreen() {
  return (
    <ActivityAddScreenStack.Navigator screenOptions={{ title: '대외활동' }}>
      <ActivityAddScreenStack.Screen
        name="ActivityAdd1"
        component={ActivityAdd1}
      />
      <ActivityAddScreenStack.Screen
        name="ActivityAdd2"
        component={ActivityAdd2}
      />
      <ActivityAddScreenStack.Screen
        name="ActivityAdd3"
        component={ActivityAdd3}
      />
      <ActivityAddScreenStack.Screen
        name="SpecAddComplete"
        component={SpecAddComplete}
      />
      {/* <ActivityAddScreenStack.Screen name="SpecSend" component={SpecSend} /> */}
    </ActivityAddScreenStack.Navigator>
  );
}

export default ActivityAddScreen;
