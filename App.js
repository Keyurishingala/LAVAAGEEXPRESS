import { View, Text, SafeAreaView } from 'react-native';
import React, { createContext, useContext, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Splash from './screen/Splash';
import constant from './component/constant';

import ForgetPassword from './screen/ForgetPassword';
import ResetPassword from './screen/ResetPassword';
import VerifyOtp from './screen/VerifyOtp';
import Register from './screen/Register';
import ServiceRegister from './screen/ServiceRegister';
// import demo from './demo';
import MyQueue from './screen/MyQueue';

import MyServices from './screen/MyServices';
import Profile from './screen/Profile';

import BottomBar from './component/BottomBar';
import DrawerScreen from './screen/DrawerScreen';
import { Provider } from 'mobx-react';
import userstore from './mobx/userstore';
import Login from './screen/Login';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const TabBarContext = createContext();

const App = () => {
  return (
    <Provider userstore={userstore}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={constant.navSplachScreen}
          screenOptions={{ headerShown: false }}>
          <Stack.Screen name={constant.navSplachScreen} component={Splash} />
          <Stack.Screen name={constant.navLoginScreen} component={Login} />
          <Stack.Screen name={constant.navRegister} component={Register} />
          <Stack.Screen
            name={constant.navServiceRegister}
            component={ServiceRegister}
          />
          <Stack.Screen
            name={constant.navForgetPassword}
            component={ForgetPassword}
          />
          <Stack.Screen name={constant.navVerifyOtp} component={VerifyOtp} />
          <Stack.Screen
            name={constant.navResetPassword}
            component={ResetPassword}
          />
          <Stack.Screen name={constant.navMyQueue} component={DrawerScreens} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

const BottomTabs = () => {
  const [showTabBar, setShowTabBar] = useState(true);

  return (
    <TabBarContext.Provider value={{ showTabBar, setShowTabBar }}>
      <Tab.Navigator
        initialRouteName={constant.navMyQueue}
        screenOptions={{ headerShown: false }}
        tabBar={props => <BottomBar {...props} />}>
        <Tab.Screen name={constant.navMyQueue} component={MyQueue} />
        <Tab.Screen name={constant.navMyServices} component={MyServices} />
        <Tab.Screen name={constant.navProfile} component={Profile} />
      </Tab.Navigator>
    </TabBarContext.Provider>
  );
};

const DrawerScreens = () => {
  return (
    <>
      <Drawer.Navigator
        useLegacyImplementation
        initialRouteName={constant.navMyQueue}
        screenOptions={{ headerShown: false }}
        drawerContent={props => {
          return <DrawerScreen {...props} />;
        }}>
        <Drawer.Screen name="bottomTabs">
          {props => <BottomTabs {...props} />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </>
  );
};

export const useTabBar = () => useContext(TabBarContext);

export default App;
