import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CertificateAdd1 from '../screens/CertificateAdd1';
import CertificateAdd2 from '../screens/CertificateAdd2';
import CertificateAdd3 from '../screens/CertificateAdd3';
import SpecAddComplete from '../screens/SpecAddComplete';
import { SpecDetailBase } from '@screens/SpecDetail';

export type CertificateAddScreenStackParamList = {
  CertificateAdd1: { id?: number; specDetail?: SpecDetailBase };
  CertificateAdd2: { id?: number; specDetail?: SpecDetailBase; name: string };
  CertificateAdd3: {
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

const CertificateAddScreenStack =
  createNativeStackNavigator<CertificateAddScreenStackParamList>();

function CertificateAddScreen() {
  return (
    <CertificateAddScreenStack.Navigator screenOptions={{ title: '자격증' }}>
      <CertificateAddScreenStack.Screen
        name="CertificateAdd1"
        component={CertificateAdd1}
      />
      <CertificateAddScreenStack.Screen
        name="CertificateAdd2"
        component={CertificateAdd2}
      />
      <CertificateAddScreenStack.Screen
        name="CertificateAdd3"
        component={CertificateAdd3}
      />
      <CertificateAddScreenStack.Screen
        name="SpecAddComplete"
        component={SpecAddComplete}
      />
    </CertificateAddScreenStack.Navigator>
  );
}

export default CertificateAddScreen;
