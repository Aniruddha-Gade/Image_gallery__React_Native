import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PATH } from '../constant/constant';
import BottomTabs from './BottomTabs';
import ImageViewerScreen from '../screens/gallery/ImageViewer';

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={PATH.BOTTOM_TAB}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={PATH.BOTTOM_TAB} component={BottomTabs} />
      <Stack.Screen name={PATH.DOC_PREVIEW} component={ImageViewerScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigation;
