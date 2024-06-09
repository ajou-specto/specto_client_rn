import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from './src/screens/Splash';
import Auth from './src/stackNav/Auth';
import Main from './src/tabNav/Main';
import { useAxiosInterceptor } from 'src/hooks/useAxiosInterceptor';
import EncryptedStorage from 'react-native-encrypted-storage';

export type RootStackParamList = {
  Splash: undefined;
  Auth: { screen: 'Login' };
  Main: undefined;
  // SpecDetail: { id: number }; // id 매개변수 추가
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppInner() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  console.log('isLoggedIn', isLoggedIn);
  useAxiosInterceptor();

  React.useEffect(() => {
    const checkIsLoggedIn = async () => {
      const accessToken = await EncryptedStorage.getItem('accessToken');
      setIsLoggedIn(!!accessToken);
    };
    checkIsLoggedIn();
  }, []);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <Stack.Group>
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="Auth" component={Auth} />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="Auth" component={Auth} />
          <Stack.Screen name="Main" component={Main} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
}

export default AppInner;
