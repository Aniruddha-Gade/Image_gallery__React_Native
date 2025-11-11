import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import React, { ReactNode, useCallback } from 'react';
import { Portal } from 'react-native-paper';
import {
  BackHandler,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { CustomIcon } from './CustomIcon';
import Color from '../../assets/Color';
import { HEIGHT, isIOS, isTablet, WIDTH } from '../../utils/Platform';
import Typo from './Typo';

type Props = {
  title: string;
  visibility: boolean;
  onClose: () => void;
  innerStyle?: ViewStyle;
  InnerContent: ReactNode;
};

export default function OverlayModal(props: Props) {
  const isFocused = useIsFocused();
  const { title, visibility, onClose, InnerContent, innerStyle } = props;

  // Handle back button
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        onClose?.();
        return true;
      };

      const sub = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );

      return () => sub.remove();
    }, [onClose]),
  );

  if (!visibility) {
    return null;
  }

  return (
    <Portal>
      <View style={[styles.overlay, !isFocused && { display: 'none' }]}>
        <KeyboardAvoidingView
          style={styles.keyboardContainer}
          behavior="padding"
          keyboardVerticalOffset={isIOS ? 100 : 70}
        >
          <View style={[styles.wrapper, innerStyle]}>
            {/* Close button */}
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <CustomIcon
                icon="AntDesign"
                name="close"
                color={Color.white}
                size={isTablet ? 30 : 25}
              />
            </TouchableOpacity>

            {/* Title */}
            <Typo style={styles.title}>{title}</Typo>

            {/* Scrollable content */}
            <ScrollView
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator
              bounces={false}
            >
              {InnerContent}
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Portal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: Color.light_grey_1,
    zIndex: 999,
    width: WIDTH,
    height: HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyboardContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  wrapper: {
    backgroundColor: Color.black_3,
    borderRadius: 16,
    width: '90%',
    maxHeight: HEIGHT * 0.95, // keeps it inside visible area but not tiny
    paddingHorizontal: isTablet ? 25 : 16,
    paddingTop: 20,
    paddingBottom: isTablet ? 30 : 17,
    elevation: 6,
    marginTop: isTablet ? 70 : 40, //  prevents touching header area
  },
  closeButton: {
    position: 'absolute',
    top: isTablet ? '2%' : '2%',
    right: isTablet ? '3%' : '5%',
    zIndex: 2,
  },
  title: {
    fontSize: isTablet ? 23 : 18,
    textAlign: 'center',
    marginBottom: 16,
    marginTop: isTablet ? 25 : 10,
  },
});
