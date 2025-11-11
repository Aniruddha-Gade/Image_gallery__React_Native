import { StyleSheet, Text, TextStyle } from 'react-native';
import React from 'react';
import Color from '../../assets/Color';
import { TypoProps } from '../../types/typs';

const Typo = ({
  size,
  color = Color.white_1,
  fontWeight = '400',
  children,
  style,
  textProps = {},
}: TypoProps) => {
  const textstyle: TextStyle = {
    fontSize: size,
    color,
    fontWeight,
  };
  return (
    <Text style={[textstyle, style]} {...textProps}>
      {children}
    </Text>
  );
};

export default Typo;

const styles = StyleSheet.create({});
