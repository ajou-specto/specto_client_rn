import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import Logo from '@assets/images/logo.svg';
import LineBlue from '@assets/images/scroll-line-blue.svg';
import Vividly from '@assets/images/vividly.svg';
import Steadily from '@assets/images/steadily.svg';
import Future from '@assets/images/future.svg';
import LineWhite from '@assets/images/scroll-line-white.svg';
import RadialBlue from '@assets/images/radial-blue.svg';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../AppInner';
import { useNavigation } from '@react-navigation/native';

const VIEW_HEIGHT = Dimensions.get('window').height; // 화면 세로길이

type Props = NativeStackNavigationProp<RootStackParamList, 'Splash'>;

function Splash() {
  const navigation = useNavigation<Props>();

  const handleStart = () => {
    console.log('Start button pressed!');
    navigation.navigate('Auth', { screen: 'Login' });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} pagingEnabled>
      <View style={styles.container}>
        <View style={styles.container}>
          <Logo />
        </View>
        <View style={styles.justifyEnd}>
          <LineBlue />
        </View>
        <Text className="mt-[20] text-[#0094FF]">Scroll down!</Text>
      </View>

      <View style={[styles.container, styles.bgBlue, { overflow: 'hidden' }]}>
        <RadialBlue style={styles.radial} />
        <View style={styles.contentContainer}>
          <Vividly />
        </View>
        <View style={styles.justifyEnd}>
          <LineWhite />
        </View>
        <Text className="mt-[20] text-white">Scroll down!</Text>
      </View>

      <View style={[styles.container, styles.bgBlue]}>
        <RadialBlue style={styles.radial} />
        <View style={styles.contentContainer}>
          <Steadily />
        </View>
        <View style={styles.justifyEnd}>
          <LineWhite />
        </View>
        <Text className="mt-[20] text-white">Scroll down!</Text>
      </View>

      <View style={[styles.container, styles.bgBlue]}>
        <RadialBlue style={styles.radial} />
        <View style={styles.contentContainer}>
          <Future />
        </View>
        <View
          style={[styles.justifyEnd, { width: '100%', paddingHorizontal: 19 }]}>
          <TouchableOpacity style={styles.button} onPress={handleStart}>
            <Text style={styles.startText}>시작하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 69,
    height: VIEW_HEIGHT,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 51,
    width: '100%',
  },
  justifyEnd: {
    justifyContent: 'flex-end',
  },
  bgBlue: {
    backgroundColor: '#0094FF',
  },
  radial: {
    position: 'absolute',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    borderRadius: 12,
    backgroundColor: 'white',
    width: '100%',
  },
  startText: {
    color: '#0094FF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Splash;
