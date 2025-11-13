import { StyleProp, TextProps, TextStyle } from 'react-native';

export type TypoProps = {
  size?: number;
  color?: string;
  fontWeight?: TextStyle['fontWeight'];
  children: any | null;
  style?: StyleProp<TextStyle>;
  textProps?: TextProps;
};

export type IconType =
  | 'AntDesign'
  | 'Entypo'
  | 'Feather'
  | 'Ionicons'
  | 'EvilIcons'
  | 'FontAwesome'
  | 'SimpleLineIcons'
  | 'Zocial'
  | 'Octicons'
  | 'MaterialCommunityIcons'
  | 'MaterialIcons'
  | 'Foundation'
  | 'FontAwesome5'
  | 'FontAwesome5Pro'
  | 'FontAwesome6'
  | 'FontAwesome6Pro'
  | 'MaterialDesignIcons'
  | 'Fontisto';

export interface IconProps {
  icon: IconType;
  size: number;
  name: string;
  color: string;
  style?: TextStyle;
}


export interface InputObject {
  [key: string]: string;
}
