import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { CustomText as Text } from '@components/CustomText';
import Tack from '@assets/images/tack.svg';
import Button from '@components/Button';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SpecScreenStackParamList } from '@stackNav/SpecScreen';

type ActivityProps = NativeStackScreenProps<
  SpecScreenStackParamList,
  'SpecAddComplete'
>;

function SpecAddComplete({ route, navigation }: Readonly<ActivityProps>) {
  const { name } = route.params;

  // Navigate to the Spec screen when the "홈으로" button is pressed
  const goToSpecScreen = () => {
    navigation.navigate('Spec');
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 justify-between py-[26] pb-[44] px-[20]">
        <Text
          className="font-[Inter-Medium] text-[#373737] text-center"
          size={13}>
          {' '}
        </Text>
        <View className="items-center">
          <Tack />
          <Text className="font-[Inter-Medium] text-[#373737] text-center mt-[40]">
            {name ? `${name}\n` : ''}등록이 완료되었습니다!{' '}
            {/* name 변수 삽입 */}
          </Text>
        </View>
        <Button
          label="홈으로"
          callbackFn={goToSpecScreen} // Call goToSpecScreen function when the button is pressed
        />
      </View>
    </SafeAreaView>
  );
}

export default SpecAddComplete;
