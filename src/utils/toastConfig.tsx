import React from 'react';
import { BaseToast, ErrorToast } from 'react-native-toast-message';
import { StyleSheet } from 'react-native';
import Typo from '../components/common/Typo';
import Color from '../assets/Color';
import { commonStyles } from '../styles/style';

export const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={styles.successToast}
      text1NumberOfLines={0}
      text1Style={commonStyles.blackColor}
      renderText1={() => (
        <Typo style={commonStyles.blackColor}>{props.text1}</Typo>
      )}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={styles.errorToast}
      text1NumberOfLines={0}
      text1Style={commonStyles.blackColor}
      renderText1={() => (
        <Typo style={commonStyles.blackColor}>{props.text1}</Typo>
      )}
    />
  ),
};

const styles = StyleSheet.create({
  successToast: {
    borderLeftColor: Color.primary,
    backgroundColor: Color.black_2,
    minHeight: 60,
    borderRadius: 10,
  },
  errorToast: {
    borderLeftColor: Color.red,
    backgroundColor: Color.black_2,
    minHeight: 60,
    borderRadius: 10,
  },
});
