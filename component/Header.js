import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

import color from './color';
import FastImage from 'react-native-fast-image';
import constant from './constant';

const Header = ({...props}) => {
  const navigation = useNavigation();

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
  );
};

export default Header;

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
});
