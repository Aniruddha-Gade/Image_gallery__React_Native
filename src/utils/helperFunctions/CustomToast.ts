import Toast from 'react-native-toast-message';
import Color from '../../assets/Color';

type ToastType = 'success' | 'error' | 'info' | (string & {});

export const ToastAlert = ({
  type,
  message,
}: {
  type: ToastType;
  message: string;
}) => {
  return Toast.show({
    type,
    text1: message,
    text1Style: { color: Color.black, backgroundColor: Color.black },
    visibilityTime: 3000,
  });
};
