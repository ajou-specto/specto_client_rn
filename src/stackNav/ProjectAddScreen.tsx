import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProjectAdd1 from '../screens/ProjectAdd1';
import ProjectAdd2, { ProofFileBase } from '../screens/ProjectAdd2';
import ProjectAdd3 from '../screens/ProjectAdd3';
import SpecAddComplete from '../screens/SpecAddComplete';
// import SpecSend from "@screens/SpecSend";
import { SpecDetailBase } from '@screens/SpecDetail';

export type ProjectAddScreenStackParamList = {
  ProjectAdd1: { id?: number; specDetail?: SpecDetailBase };
  ProjectAdd2: { id?: number; specDetail?: SpecDetailBase; name: string };
  ProjectAdd3: {
    id?: number;
    specDetail?: SpecDetailBase;
    name: string;
    host: string;
    startDate: string | null;
    endDate: string | null;
    field: string;
    contents: string | null;
    proofFile: ProofFileBase | null;
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

const ProjectAddScreenStack =
  createNativeStackNavigator<ProjectAddScreenStackParamList>();

function ProjectAddScreen() {
  return (
    <ProjectAddScreenStack.Navigator screenOptions={{ title: '대외활동' }}>
      <ProjectAddScreenStack.Screen
        name="ProjectAdd1"
        component={ProjectAdd1}
      />
      <ProjectAddScreenStack.Screen
        name="ProjectAdd2"
        component={ProjectAdd2}
      />
      <ProjectAddScreenStack.Screen
        name="ProjectAdd3"
        component={ProjectAdd3}
      />
      <ProjectAddScreenStack.Screen
        name="SpecAddComplete"
        component={SpecAddComplete}
      />
      {/* <ProjectAddScreenStack.Screen name="SpecSend" component={SpecSend} /> */}
    </ProjectAddScreenStack.Navigator>
  );
}

export default ProjectAddScreen;
