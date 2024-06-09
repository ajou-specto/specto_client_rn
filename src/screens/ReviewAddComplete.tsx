import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { CustomText as Text } from '@components/CustomText';
import Tack from '@assets/images/tack.svg';
import Button from '@components/Button';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ReviewListScreenStackParamList } from '@stackNav/ReviewListScreen';

type ReviewListScreenProps = NativeStackScreenProps<
  ReviewListScreenStackParamList,
  'ReviewAddComplete'
>;
function ReviewAddComplete({ navigation }: Readonly<ReviewListScreenProps>) {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 justify-between py-[26] pb-[44] px-[20]">
        <Text
          className="font-[Inter-Medium] text-[#373737] text-center"
          size={13}>
          2024.03.28
        </Text>
        <View className="items-center">
          <Tack />
          <Text className="font-[Inter-Medium] text-[#373737] text-center mt-[40]">
            회고가 저장되었어요.{'\n'}오늘도 수고 많으셨습니다 :{')'}
          </Text>
        </View>
        <Button
          label="홈으로"
          callbackFn={() => navigation.navigate('ReviewList')}
        />
      </View>
    </SafeAreaView>
  );
}

export default ReviewAddComplete;
