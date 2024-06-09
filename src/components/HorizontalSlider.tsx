import React from 'react';
import { View, PanResponder, Dimensions } from 'react-native';
import { CustomText as Text } from '@components/CustomText';
import { LinearGradient } from 'react-native-linear-gradient';

interface HorizontalSliderBase {
  progress?: number;
  setProgress?: (position: number) => void;
}
const HorizontalSlider = ({
  progress,
  setProgress,
}: Readonly<HorizontalSliderBase>) => {
  // PanResponder 설정
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gestureState) => {
      // 수평 이동 거리 계산
      const newPosition = gestureState.moveX / SCREEN_WIDTH; // 전체 너비 대비 이동한 거리
      // 위치가 0%에서 100% 사이에 있도록 제한
      const clampedPosition = Math.max(0, Math.min(1, newPosition));
      if (setProgress) {
        setProgress(clampedPosition);
      }
    },
  });

  return (
    <View className="relative" {...panResponder.panHandlers}>
      <LinearGradient
        className="abolute top-0 h-[5]"
        style={{
          borderRadius: 10,
        }}
        colors={['rgba(0, 148, 255, 0)', 'rgba(0,148,255,1)']}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
      />
      <Text
        className="absolute top-[5] text-[#898A8D] rotate-[12deg]"
        size={10}>
        0
      </Text>
      <Text
        className="absolute top-[5] left-1/2 text-[#898A8D] rotate-[12deg]"
        size={10}>
        50
      </Text>
      <Text
        className="absolute top-[5] right-0 text-[#898A8D] rotate-[12deg]"
        size={10}>
        100
      </Text>
      <View
        className="absolute bottom-[-4]"
        style={{
          left: `${Math.round(Math.min(progress ?? 0.5, 0.93) * 100)}%`,
        }}>
        <Text size={25}>👩🏻‍💻</Text>
      </View>
      <Text
        className="absolute bottom-[25] font-[Inter-SemiBold] text-[#0094FF]"
        style={{
          left: `${Math.round(Math.min(progress ?? 0.5, 0.93) * 100)}%`,
        }}
        size={15}>
        {`${Math.round((progress ?? 0.5) * 100)}`}%
      </Text>
    </View>
  );
};

const SCREEN_WIDTH = Dimensions.get('window').width;

export default HorizontalSlider;
