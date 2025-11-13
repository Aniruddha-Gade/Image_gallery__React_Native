import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Color from '../../assets/Color';
import { isTablet } from '../../utils/Platform';
import FONT_FAMILY from '../../assets/FontFamily';

interface Props {
  buttonColor: string;
  text: string;
  borderRadius?: number;
  disabled?: boolean;
  onPress: () => void;
  loader?: boolean;
  style?: StyleProp<ViewStyle>;
}

function CustomButton(props: Props) {
  const {
    buttonColor,
    text,
    borderRadius = 4,
    disabled,
    onPress,
    loader,
    style,
  } = props;

  return (
    <TouchableOpacity
      activeOpacity={0.4}
      onPress={onPress}
      style={[
        styles.mainView,
        { backgroundColor: buttonColor, borderRadius , opacity:disabled ? 0.5 : 1 },
        style,
      ]}
      disabled={disabled}
    >
      {loader ? (
        <ActivityIndicator size="small" color={Color.white} />
      ) : (
        <Text style={styles.buttonText}>{text}</Text>
      )}
    </TouchableOpacity>
  );
}

export default CustomButton;

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: Color.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    paddingVertical: '3%',
    width: '100%',
  },
  buttonText: {
    fontSize: isTablet ? 22 : 16,
    lineHeight: isTablet ? 30 : 24,
    color: Color.white,
    fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
    letterSpacing: 0.65,
  },
});
