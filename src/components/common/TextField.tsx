import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TextInputProps,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import React, { useState } from 'react';
import { notEmpty } from '../../utils/Validations';
import Color from '../../assets/Color';
import FONT_FAMILY, { FONT_SIZE } from '../../assets/FontFamily';
import Typo from './Typo';
import { commonStyles } from '../../styles/style';

interface TextInputComponentProps {
  placeholder: string;
  value: string | number;
  onChangeText: (text: string) => void;
  label: string;
  labelStyle?: StyleProp<TextStyle>;
  error?: boolean;
  errorMessage?: string;
  inputWrapper?: ViewStyle;
  inputRowStyle?: ViewStyle;
  mandatory?: boolean;
  inputStyle?: TextStyle;
  editable?: boolean;
}

function TextField(props: TextInputProps & TextInputComponentProps) {
  const {
    placeholder,
    value,
    onChangeText,
    labelStyle,
    label,
    error,
    errorMessage,
    inputWrapper,
    inputStyle,
    mandatory,
    editable = true,
    ...rest
  } = props;

  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <View
      style={[
        styles.mainContainer,
        inputWrapper,
        { opacity: editable ? 1 : 0.6 },
      ]}
    >
      {notEmpty(label) && (
        <View style={styles.labelRow}>
          <Typo style={[styles.labelStyle, labelStyle]}>{label}</Typo>

          {mandatory && <Typo style={commonStyles.mandatory}>*</Typo>}
        </View>
      )}

      <View style={[styles.inputRow, isFocused && styles.focusedBorder]}>
        <TextInput
          style={[styles.input, inputStyle || {}]}
          onChangeText={onChangeText}
          value={value}
          editable={editable}
          placeholder={placeholder}
          placeholderTextColor={Color.grey}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          // eslint-disable-next-line
          {...rest}
        />
      </View>

      {error && <Typo style={commonStyles.error}>{errorMessage}</Typo>}
    </View>
  );
}

export default TextField;

export const styles = StyleSheet.create({
  mainContainer: {
    marginBottom: '4%',
    borderColor: 'red',
  },
  input: {
    color: Color.white_1,
    fontSize: FONT_SIZE,
    width: '100%',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Color.light_grey_2,
    borderWidth: 1,
    borderRadius: 4,
    marginVertical: '1%',
    paddingHorizontal: '1%',
    height: 45,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelStyle: {
    fontSize: FONT_SIZE,
    lineHeight: 21,
    color: Color.white_1,
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
    fontWeight: '400',
  },
  focusedBorder: {
    borderColor: Color.primary_light_1,
    borderWidth: 1.2,
  },
});
