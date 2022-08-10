import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTranslation} from 'react-i18next';

import color from './color';
import FastImage from 'react-native-fast-image';
import constant from './constant';
import {inject, observer} from 'mobx-react';
import userstore from '../mobx/userstore';
import common from '../helper/common';

const Header = ({...props}) => {
  const navigation = useNavigation();
  const {t, i18n} = useTranslation();

  const option = [
    {lbl: 'English', value: 'en'},
    {lbl: 'French', value: 'fr'},
  ];

  const [visible, setVisible] = useState(false);

  const animation = new Animated.Value(0);
  const inputRange = [0, 1];
  const outputRange = [1, 0.8];
  const scale = animation.interpolate({inputRange, outputRange});

  useEffect(() => {
    Animated.spring(animation, {
      toValue: 1,
      useNativeDriver: true,
      // delay: 100,
    }).start();
  }, [visible]);

  return (
    <View style={style.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          activeOpacity={0.6}
          style={{
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => navigation.toggleDrawer()}>
          <View
            style={{
              width: 30,
              height: 30,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: color.darkBlue,
              marginHorizontal: 10,
            }}>
            <FastImage
              resizeMode={FastImage.resizeMode.contain}
              source={require('../component/image/Icn_sidemenu.png')}
              style={{height: '100%', width: '100%'}}
            />
            {/* <Entypo name="menu" style={{color: COLOR.white, fontSize: 25}} /> */}
          </View>
        </TouchableOpacity>
        {props.titLeft && props.title && (
          <Text style={style.textStyle} numberOfLines={1}>
            {props.title}
          </Text>
        )}
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
        }}>
        {props.translate ? (
          <TouchableOpacity
            style={{
              width: 23,
              height: 23,
              alignItems: 'center',
              justifyContent: 'center',
              marginHorizontal: 10,
              alignSelf: 'center',
            }}
            onPress={() => setVisible(!visible)}>
            <MaterialCommunityIcons
              name="translate"
              size={25}
              color={color.white}
            />
          </TouchableOpacity>
        ) : null}
        {props.notification ? (
          <TouchableOpacity
            style={{
              width: 23,
              height: 23,
              alignItems: 'center',
              justifyContent: 'center',
              marginHorizontal: 10,
              alignSelf: 'center',
            }}
            // onPress={() => navigation.navigate(constant.navNotificationScreen)}
          >
            <FastImage
              resizeMode={FastImage.resizeMode.contain}
              source={require('../component/image/icn_notfication.png')}
              style={{height: '100%', width: '100%'}}
            />
          </TouchableOpacity>
        ) : null}
      </View>
      {visible === true && (
        <>
          <Animated.View style={[style.translate, {transform: [{scale}]}]}>
            {option.map((val, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    i18n.changeLanguage(val.value);
                    setVisible(false);
                  }}>
                  <Text style={{fontSize: 19, color: color.black}}>
                    {val.lbl}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </Animated.View>
        </>
      )}
    </View>
  );
};

export default inject('userstore')(observer(Header));

const style = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: color.darkBlue,
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 2,
  },
  textStyle: {
    color: color.white,
    fontSize: 23,
    marginLeft: 10,
    fontFamily: 'Roboto-Medium',
  },
  translate: {
    backgroundColor: color.white,
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    right: 70,
    top: 30,
    justifyContent: 'space-evenly',
    height: '150%',
    // paddingVertical: 5,
    width: '30%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
