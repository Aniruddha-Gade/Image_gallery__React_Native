import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Home from '../screens/home/Home';
import { isTablet } from '../utils/Platform';
import { BTM_TAB_NAMES } from '../constant/constant';
import FONT_FAMILY from '../assets/FontFamily';
import Color from '../assets/Color';
import Typo from '../components/common/Typo';

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
      {/* <StyledTextBold>Coming Soon.....</StyledTextBold> */}
    </View>
  );
}

const Size = isTablet ? 30 : 25;

const createTabIcon = (iconName: string) => {
  const TabIcon = function TabIconComponent({ color }: { color: string }) {
    return <MaterialIcons name={iconName} size={Size} color={color} />;
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
        tabBarInactiveTintColor: Color.grey,
        tabBarStyle: {
          minHeight: isTablet ? 55 : 55,
          alignItems: 'center',
          paddingHorizontal: isTablet ? 8 : 0,
        },
        tabBarHideOnKeyboard: true,
        tabBarLabelPosition: isTablet ? 'beside-icon' : 'below-icon',
        tabBarShowLabel: true,
      }}
    >
      <Tab.Screen
        name={BTM_TAB_NAMES.HOME}
        component={Home}
        options={{
          tabBarLabel: BTM_TAB_NAMES.HOME,
          tabBarIcon: createTabIcon('dashboard'),
        }}
      />

      <Tab.Screen
        name={BTM_TAB_NAMES.GALLERY}
        component={TempScreens}
        options={{
          tabBarLabel: BTM_TAB_NAMES.GALLERY,
          tabBarIcon: createTabIcon('gallery'),
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
