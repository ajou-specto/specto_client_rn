import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@stackNav/Auth';
import EncryptedStorage from 'react-native-encrypted-storage';
import { RootStackParamList } from 'AppInner';
import { CompositeScreenProps } from '@react-navigation/native';
import axios from 'axios';
import axiosInstance from 'src/api/axiosInstance';
import Config from 'react-native-config';

type AuthProps = NativeStackScreenProps<AuthStackParamList, 'LoginKakao'>;
type RootProps = NativeStackScreenProps<RootStackParamList>;
type Props = CompositeScreenProps<AuthProps, RootProps>;

const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;

export default function LoginKakao({ navigation }: Readonly<Props>) {
  const login = async (id_token: string) => {
    try {
      const res = await axiosInstance.get(
        `/api/v1/login?id_token=${id_token}&social=kakao`,
      );
      console.log('kakao login 입니다잉', res);
      const { accessToken, refreshToken } = res.data;

      // // Delete existing tokens before setting new ones
      // await SecureStore.deleteItemAsync("accessToken");
      // await SecureStore.deleteItemAsync("refreshToken");

      // 토큰 저장 (SecureStore)
      await EncryptedStorage.setItem('accessToken', accessToken);
      await EncryptedStorage.setItem('refreshToken', refreshToken);

      // 홈화면으로 이동
      navigation.navigate('Main');
    } catch (e) {
      console.log(e);
    }
  };

  const getToken = async (authorize_code: string) => {
    try {
      const res = await axios.post(
        `https://kauth.kakao.com/oauth/token`,
        {
          grant_type: 'authorization_code',
          client_id: Config.KAKAO_REST_API_KEY,
          redirect_url: Config.KAKAO_REDIRECT_URI,
          code: authorize_code,
          client_secret: Config.KAKAO_CLIENT_SECRET,
        },
        {
          headers: {
            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
        },
      );
      const { id_token } = res.data;
      console.log('id_token', id_token);
      login(id_token);
    } catch (e) {
      console.log(e);
    }
  };

  const getCode = (data: string) => {
    const exp = 'code=';
    const condition = data.indexOf(exp);
    if (condition != -1) {
      const authorize_code = data.substring(condition + exp.length);
      console.log('authorize_code', authorize_code);
      getToken(authorize_code);
    }
  };

  return (
    <View style={{ flex: 1, marginTop: 24, backgroundColor: '#fff' }}>
      <WebView
        style={{ flex: 1 }}
        originWhitelist={['*']}
        scalesPageToFit={false}
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${Config.KAKAO_REST_API_KEY}&redirect_uri=${Config.KAKAO_REDIRECT_URI}`,
        }}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        javaScriptEnabled={true}
        onMessage={event => {
          getCode(event.nativeEvent['url']);
        }}
      />
    </View>
  );
}
