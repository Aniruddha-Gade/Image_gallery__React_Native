import { StyleSheet } from 'react-native';
import FONT_FAMILY, { FONT_SIZE } from '../assets/FontFamily';
import Color from '../assets/Color';

export const commonStyles = StyleSheet.create({
  mandatory: {
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
    fontSize: 12,
    lineHeight: 14,
    color: Color.red,
    marginLeft: 2,
  },
  error: {
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
    fontSize: 11,
    lineHeight: FONT_SIZE,
    textAlign: 'left',
    color: Color.red,
  },
});
