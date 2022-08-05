import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import color from './color';
import FastImage from 'react-native-fast-image';
import constant from './constant';
import userstore from '../mobx/userstore';
import {toJS} from 'mobx';
import {useTabBar} from '../App';

const BottomBar = ({navigation, route}) => {
  const [first, setfirst] = useState(true);
  const [second, setsecond] = useState(false);
  const [third, setthird] = useState(false);

  const {showTabBar} = useTabBar();

  const animation = useRef(new Animated.Value(0)).current;

  const toggleTabBarAnimation = () => {
    if (showTabBar) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: 100,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  };

  useEffect(() => {
    toggleTabBarAnimation();
  }, [showTabBar]);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        width: '100%',
        bottom: -5,
        justifyContent: 'center',
        transform: [{translateY: animation}],
      }}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
          paddingHorizontal: 30,
          backgroundColor: color.darkBlue,
          borderTopRightRadius: 25,
          borderTopLeftRadius: 25,
          // paddingBottom: 13,
          height: 80,
          overflow: 'hidden',
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(constant.navMyQueue), setfirst(true);
            setsecond(false), setthird(false);
          }}>
          {first === true ? (
            <View style={styles.BottomBarView}>
              <FastImage
                source={require('../component/image/Icn_queueblue.png')}
                style={styles.logoImg}
                resizeMode={FastImage.resizeMode.contain}
              />
            </View>
          ) : (
            <View style={styles.BottomBarView}>
              <FastImage
                source={require('../component/image/Icn_queuewhite.png')}
                style={styles.logoImg}
                resizeMode={FastImage.resizeMode.contain}
              />
            </View>
          )}
          <Text
            style={[
              styles.txt,
              {color: first === true ? color.blue : color.white},
            ]}>
            My Queue
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(constant.navMyServices), setfirst(false);
            setsecond(true), setthird(false);
          }}>
          {second === true ? (
            <View style={styles.BottomBarView}>
              <FastImage
                source={require('../component/image/Ic_serviceblue.png')}
                style={styles.logoImg}
                resizeMode={FastImage.resizeMode.contain}
              />
            </View>
          ) : (
            <View style={styles.BottomBarView}>
              <FastImage
                source={require('../component/image/Ic_servicewhite.png')}
                style={styles.logoImg}
                resizeMode={FastImage.resizeMode.contain}
              />
            </View>
          )}
          <Text
            style={[
              styles.txt,
              {color: second === true ? color.blue : color.white},
            ]}>
            My Services
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(constant.navProfile), setfirst(false);
            setsecond(false), setthird(true);
          }}>
          {third === true ? (
            <View style={styles.BottomBarView}>
              <FastImage
                source={require('../component/image/Icn_profileblue.png')}
                style={styles.logoImg}
                resizeMode={FastImage.resizeMode.contain}
              />
            </View>
          ) : (
            <View style={styles.BottomBarView}>
              <FastImage
                source={require('../component/image/Icn_profile.png')}
                style={styles.logoImg}
                resizeMode={FastImage.resizeMode.contain}
              />
            </View>
          )}
          <Text
            style={[
              styles.txt,
              {color: third === true ? color.blue : color.white},
            ]}>
            Profile
          </Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default BottomBar;

const styles = StyleSheet.create({
  logoImg: {
    width: '100%',
    height: '100%',
  },
  BottomBarView: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 30,
    height: 30,
  },
  txt: {fontFamily: 'Roboto-Medium', marginTop: 8},
});
