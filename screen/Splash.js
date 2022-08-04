import {View, Text, StyleSheet, Image, StatusBar} from 'react-native';
import React, {useEffect, useState} from 'react';
import FastImage from 'react-native-fast-image';
import {StackActions} from '@react-navigation/native';
// import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

import constant from '../component/constant';
import color from '../component/color';
import userstore from '../mobx/userstore';

const Splash = ({navigation}) => {
  const [user, setUser] = useState();
  // SplashScreen.hide();

  // useEffect(async () => {
  //   await AsyncStorage.getItem('user')
  //     .then(res => console.log('res', res))
  //     .catch(err => console.log('err', err));
  // }, []);

  const startWithDelay = () => {
    // const openScreen = () => {
    //   // if (user !== undefined) {
    //   //   navigation.dispatch(StackActions.replace(constant.navMyQueue));
    //   // } else {
    //   //   navigation.dispatch(StackActions.replace(constant.navLoginScreen));
    //   // }
    // };

    setTimeout(async () => {
      await openScreen();
    }, 1000);
  };

  const openScreen = async () => {
    AsyncStorage.getItem('user').then(async res => {
      if (!res) {
        navigation.dispatch(StackActions.replace(constant.navServiceRegister));
      } else {
        navigation.dispatch(StackActions.replace(constant.navMyQueue));
      }
    });
  };

  useEffect(() => {
    startWithDelay();
  }, []);

  const renderMainView = () => {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={color.blue} />
        <FastImage
          source={require('../component/image/Splash.png')}
          style={styles.logoImg}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>
    );
  };

  return renderMainView();
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImg: {
    width: '100%',
    height: '100%',
  },
});
