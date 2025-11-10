import { StyleProp, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { CustomIcon } from './CustomIcon';
import Color from '../../assets/Color';
import { isTablet } from '../../utils/Platform';
import { IconType } from '../../types/typs';

type IconButtonProps = {
  onPress: () => void;
  icon: IconType;
  name: string;
  customStyles?: StyleProp<any>;
};

const IconButton = (props: Readonly<IconButtonProps>) => {
  const { onPress, icon, name, customStyles } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.3}
      style={[styles.icon, customStyles]}
    >
      <CustomIcon
        name={name}
        size={isTablet ? 25 : 22}
        color={Color.white}
        icon={icon}
      />
    </TouchableOpacity>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  icon: {
    width: 50,
    height: 50,
    margin: 5,
    borderRadius: 10,
    backgroundColor: Color.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
