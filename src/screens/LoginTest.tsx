import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@stackNav/Auth';
import axiosInstance from 'src/api/axiosInstance';
import EncryptedStorage from 'react-native-encrypted-storage';
import { RootStackParamList } from 'AppInner';
import { CompositeScreenProps } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';

type AuthProps = NativeStackScreenProps<AuthStackParamList, 'LoginTest'>;
type RootProps = NativeStackScreenProps<RootStackParamList>;
type Props = CompositeScreenProps<AuthProps, RootProps>;

function LoginTest({ navigation }: Readonly<Props>) {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleTestLogin = async () => {
    try {
      const res = await axiosInstance.get(`/api/v1/login/test-login`);
      console.log('/api/v1/login/test-login', res);
      const { accessToken, refreshToken } = res.data;

      // 토큰 저장 (SecureStore)
      await EncryptedStorage.setItem('accessToken', accessToken);
      await EncryptedStorage.setItem('refreshToken', refreshToken);

      // 홈화면으로 이동
      if (res.status === 200) {
        Alert.alert('로그인에 성공했습니다!');
        navigation.navigate('Main');
      } else {
        Alert.alert('로그인에 실패했습니다.');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleNext = () => {
    const MASTER_ID = 'test';
    const MASTER_PW = 'test80';
    if (id !== MASTER_ID || password !== MASTER_PW) {
      Alert.alert('아이디 혹은 비밀번호가 올바르지 않습니다.');
      return;
    }
    handleTestLogin();
  };

  return (
    <View style={styles.container}>
      <View style={[styles.inputBox, { marginBottom: 20 }]}>
        <Text style={styles.inputLabel}>아이디</Text>
        <TextInput
          style={styles.inputText}
          placeholder="아이디를 입력해주세요."
          onChangeText={text => setId(text)} // name 값 업데이트
          value={id}
        />
      </View>
      <View style={styles.inputBox}>
        <Text style={styles.inputLabel}>비밀번호</Text>
        <TextInput
          style={styles.inputText}
          placeholder="비밀번호를 입력해주세요."
          onChangeText={text => setPassword(text)} // name 값 업데이트
          value={password}
          secureTextEntry
        />
      </View>
      <TouchableOpacity style={styles.buttonContainer} onPress={handleNext}>
        <Text style={styles.buttonText}>로그인</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFCFE',
    alignItems: 'center',
    // justifyContent: "center",
    marginTop: 100,
  },
  inputBox: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    // position: "absolute",
    // top: 90,
    // left: 30,
    alignItems: 'center',
    width: '85%',
  },
  inputLabel: {
    alignSelf: 'stretch',
    color: '#9F9F9F',
    fontSize: 10,
    fontWeight: '400',
  },
  inputText: {
    marginTop: 5,
    alignSelf: 'stretch',
    color: '#C1C1C1',
    fontSize: 16,
    fontWeight: '400',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 100,
    backgroundColor: '#0094FF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    height: 50, // 높이 조절
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 22,
  },
});

export default LoginTest;
