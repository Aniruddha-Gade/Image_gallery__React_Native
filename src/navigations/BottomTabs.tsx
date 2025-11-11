import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { View } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Home from '../screens/home/Home';
import { isTablet } from '../utils/Platform';
import { BTM_TAB_NAMES } from '../constant/constant';
import FONT_FAMILY from '../assets/FontFamily';
import Color from '../assets/Color';
import Typo from '../components/common/Typo';
import GalleryScreen from '../screens/gallery/GalleryScreen';

const Tab = createBottomTabNavigator();

function TempScreens() {
  // eslint-disable-next-line react-native/no-raw-text
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Typo
        text="Coming Soon....."
        fontSize={isTablet ? 22 : 18}
        fontFamily={FONT_FAMILY.POPPINS_SEMIBOLD}
      />
    </View>
  );
}

const Size = isTablet ? 30 : 25;

const createTabIcon = (iconName: string) => {
  const TabIcon = function TabIconComponent({ color }: { color: string }) {
    if (iconName === 'settings') {
      return <Feather name={iconName} size={Size} color={color} />;
    }

    return <Entypo name={iconName} size={Size} color={color} />;
  };
  return TabIcon;
};

function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: isTablet ? 13 : 10,
          fontFamily: FONT_FAMILY.POPPINS_SEMIBOLD,
        },
        tabBarActiveTintColor: Color.primary,
        tabBarInactiveTintColor: Color.white,
        tabBarStyle: {
          minHeight: 55,
          alignItems: 'center',
          backgroundColor: Color.black_2,
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarHideOnKeyboard: true,
        tabBarLabelPosition: isTablet ? 'beside-icon' : 'below-icon',
        tabBarShowLabel: true,
        tabBarActiveBackgroundColor: Color.black_1,
      }}
    >
      <Tab.Screen
        name={BTM_TAB_NAMES.HOME}
        component={Home}
        options={{
          tabBarLabel: BTM_TAB_NAMES.HOME,
          tabBarIcon: createTabIcon('home'),
        }}
      />

      <Tab.Screen
        name={BTM_TAB_NAMES.GALLERY}
        component={GalleryScreen}
        options={{
          tabBarLabel: BTM_TAB_NAMES.GALLERY,
          tabBarIcon: createTabIcon('images'),
        }}
      />
      <Tab.Screen
        name={BTM_TAB_NAMES.SETTINGS}
        component={TempScreens}
        options={{
          tabBarLabel: BTM_TAB_NAMES.SETTINGS,
          tabBarIcon: createTabIcon('settings'),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabs;
