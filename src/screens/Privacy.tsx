import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MyPageScreenStackParamList } from '@stackNav/MyPageScreen';

type MyPageProps = NativeStackScreenProps<
  MyPageScreenStackParamList,
  'Privacy'
>;

export default function Privacy({ navigation, route }: Readonly<MyPageProps>) {
  return (
    <View style={{ flex: 1, marginTop: 24, backgroundColor: '#fff' }}>
      <WebView
        style={{ flex: 1 }}
        originWhitelist={['*']}
        scalesPageToFit={false}
        source={{
          uri: `https://spectacle-specto.vercel.app/privacy`,
        }}
      />
    </View>
  );
}
