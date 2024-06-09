import React from 'react';
import { StyleSheet, Text, TextStyle } from 'react-native';

type Component = {
  children: string | string[];
  style?: TextStyle | TextStyle[];
  className?: string;
  size?: number;
};
export const CustomText: React.FC<Component> = ({ children, ...props }) => {
  return (
    <Text
      {...props}
      style={[styles(props.size ?? 16).defaultFontText, props.style]}
      className={props.className}>
      {children}
    </Text>
  );
};

const styles = (size: number) =>
  StyleSheet.create({
    defaultFontText: {
      fontFamily: 'Inter-Regular',
      fontSize: size,
    },
  });
