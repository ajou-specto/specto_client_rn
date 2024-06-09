import React from 'react';
import { Pressable } from 'react-native';
import { CustomText as Text } from '@components/CustomText';

interface ButtonBase {
  label: string;
  callbackFn: () => void;
}
function Button({ label, callbackFn }: Readonly<ButtonBase>) {
  return (
    <Pressable
      className="justify-center items-center h-[48] border border-[#0094FF]"
      style={{ borderRadius: 12 }}
      onPress={callbackFn}>
      <Text className="font-[Inter-SemiBold] text-[#0094FF]" size={14}>
        {label}
      </Text>
    </Pressable>
  );
}

export default Button;
