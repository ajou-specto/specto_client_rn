import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store from './src/store';
import AppInner from './AppInner';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FFFFFF',
  },
};

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer theme={navTheme}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <AppInner />
        </GestureHandlerRootView>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
