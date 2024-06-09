import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import LoginKakao from '@screens/LoginKakao';
import LoginGoogle from '@screens/LoginGoogle';
import LoginTest from '@screens/LoginTest';

export type AuthStackParamList = {
  Login: undefined;
  LoginKakao: undefined;
  LoginGoogle: undefined;
  LoginTest: undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

function Auth() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen
        name="Login"
        component={Login}
        options={{ title: '로그인' }}
      />
      <AuthStack.Screen
        name="LoginKakao"
        component={LoginKakao}
        options={{ title: '카카오 로그인' }}
      />
      <AuthStack.Screen
        name="LoginGoogle"
        component={LoginGoogle}
        options={{ title: '카카오 로그인' }}
      />
      <AuthStack.Screen
        name="LoginTest"
        component={LoginTest}
        options={{ title: '일반 로그인', headerShown: true }}
      />
    </AuthStack.Navigator>
  );
}

export default Auth;
