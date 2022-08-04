import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Platform,
  ScrollView,
  Animated,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FastImage from 'react-native-fast-image';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import color from '../component/color';
import BaseScreen from '../component/BaseScreen';
import constant from '../component/constant';
import {passwordValidator, reTypePassValidator} from '../helper/Validator';

var isHidden = true;

const ResetPassword = ({navigation}) => {
  const bounceValue = new Animated.Value(48);

  const [password, setPassword] = useState({value: '', error: ''});
  const [passwordVisibility, setpasswordVisibility] = useState(true);

  const [reTypePass, setreTypePass] = useState({
    value: '',
    error: '',
  });

  useEffect(() => {
    toggleSubview();
  }, []);

  const onLogin = () => {
    const passwordError = passwordValidator(password.value);
    const reTypePassError = reTypePassValidator(
      password.value,
      reTypePass.value,
    );
    if (passwordError) {
      setPassword({...password, error: passwordError});
      return;
    } else if (reTypePassError) {
      setreTypePass({...reTypePass, error: reTypePassError});
      return;
    } else {
      navigation.replace(constant.navMyQueue);
    }
  };

  const toggleSubview = () => {
    var toValue = 100;

    if (isHidden) {
      toValue = 0;
    }

    Animated.spring(bounceValue, {
      toValue: toValue,
      velocity: 3,
      tension: 2,
      friction: 8,
      useNativeDriver: true,
    }).start();
  };

  return (
    <BaseScreen
      color={color.blue}
      StatusBarColor={color.blue}
      barStyle={'light-content'}
      translucent={Platform.OS === 'ios' ? true : false}>
      <View
        style={{
          height: hp(50),
          alignItems: 'center',
          // justifyContent: 'flex-end',
        }}>
        <FastImage
          source={require('../component/image/Illustretion_Login.png')}
          style={styles.logoImg}
          resizeMode={FastImage.resizeMode.stretch}
        />
        <View
          style={{
            position: 'absolute',
            top: '45%',
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 35,
              color: color.white,
              fontFamily: 'Roboto-Bold',
            }}>
            Reset Password?
          </Text>

          <Text
            style={{
              marginTop: 10,
              textAlign: 'center',
              fontSize: 17,
              color: color.white,
              lineHeight: 20,
              fontFamily: 'Roboto-Medium',
              marginBottom: 75,
            }}>
            Your new password must be different{`\n`}from previous used
            passwords.
          </Text>
        </View>
      </View>
      <Animated.View
        style={[styles.view, {transform: [{translateY: bounceValue}]}]}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          bounces={false}
          showsVerticalScrollIndicator={false}>
          <Text
            style={{
              textAlign: 'center',
              color: color.white,
              fontSize: 25,
              marginVertical: 20,
              fontFamily: 'Roboto-Bold',
            }}>
            - Reset Password -
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: color.white,
              marginHorizontal: 30,
              borderRadius: 5,
              paddingHorizontal: 13,
              paddingVertical: Platform.OS === 'ios' ? 10 : 2,
            }}>
            <TextInput
              placeholder="New Password"
              placeholderTextColor={color.lightgrey}
              // textAlign="center"
              value={password.value}
              secureTextEntry={passwordVisibility}
              style={{
                // marginHorizontal: 30,
                // paddingLeft: 15,

                width: wp(70),
                // paddingVertical: 13,
                fontFamily: 'Roboto-Regular',
                color: color.black,
                // letterSpacing: 0.5,
              }}
              onChangeText={text => setPassword({value: text, error: ''})}
            />
            <TouchableOpacity
              onPress={() => setpasswordVisibility(!passwordVisibility)}>
              <Ionicons
                name={passwordVisibility ? 'eye-sharp' : 'eye-off-sharp'}
                size={25}
              />
            </TouchableOpacity>
          </View>
          {password.error ? (
            <Text style={[styles.errTxt, {marginTop: 10}]}>
              {password.error}
            </Text>
          ) : null}
          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor={color.lightgrey}
            // textAlign="center"
            value={reTypePass.value}
            secureTextEntry
            style={{
              backgroundColor: color.white,
              borderRadius: 5,
              marginHorizontal: 30,
              marginVertical: 10,
              paddingLeft: 15,
              paddingVertical: 13,
              fontFamily: 'Roboto-Regular',
              color: color.black,
              // letterSpacing: 0.5,
            }}
            onChangeText={text => setreTypePass({value: text, error: ''})}
          />
          {reTypePass.error ? (
            <Text style={[styles.errTxt, {marginBottom: 10}]}>
              {reTypePass.error}
            </Text>
          ) : null}
          <Text
            style={{
              color: color.white,
              fontSize: 17,
              marginLeft: 30,
              marginVertical: 5,
              fontFamily: 'Roboto-Bold',
            }}>
            Note: Both password must match
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              backgroundColor: color.blue,
              marginHorizontal: 30,
              marginVertical: 20,
              borderRadius: 5,
              paddingVertical: 10,
            }}
            onPress={() => onLogin()}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginHorizontal: 20,
              }}>
              <Text
                style={{
                  color: color.white,
                  fontFamily: 'Roboto-Bold',
                  fontSize: 17,
                  letterSpacing: 0.3,
                }}>
                Submit
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    height: 30,
                    backgroundColor: color.white,
                    width: 1,
                    borderRadius: 10,
                  }}
                />
                <AntDesign
                  name="caretright"
                  size={18}
                  color={color.white}
                  style={{marginLeft: 20}}
                />
              </View>
            </View>
          </TouchableOpacity>
          <View style={{height: hp(8), marginVertical: 5}} />
        </ScrollView>
      </Animated.View>
    </BaseScreen>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  logoImg: {
    width: '100%',
    height: '100%',
  },
  errTxt: {color: color.lightRed, marginLeft: 30},
  view: {
    position: 'absolute',
    backgroundColor: color.darkBlue,
    // backgroundColor: 'red',
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    height: hp(60),
    width: '100%',
    alignSelf: 'center',
    top: '48%',
  },
});
