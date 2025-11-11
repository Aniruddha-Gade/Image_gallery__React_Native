import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Home from '../screens/home/Home';
import { isTablet } from '../utils/Platform';
import { BTM_TAB_NAMES } from '../constant/constant';
import FONT_FAMILY from '../assets/FontFamily';
import Color from '../assets/Color';
import GalleryScreen from '../screens/gallery/GalleryScreen';
import TodoScreen from '../screens/todo-list/TodoScreen';

const Tab = createBottomTabNavigator();

const Size = isTablet ? 30 : 25;

const createTabIcon = (iconName: string) => {
  const TabIcon = function TabIconComponent({ color }: { color: string }) {
    if (iconName === 'tasks') {
      return <FontAwesome5 name={iconName} size={Size} color={color} />;
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
        name={BTM_TAB_NAMES.TODO}
        component={TodoScreen}
        options={{
          tabBarLabel: BTM_TAB_NAMES.TODO,
          tabBarIcon: createTabIcon('tasks'),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabs;
