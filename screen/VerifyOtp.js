import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  SafeAreaView,
  Animated,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import FastImage from 'react-native-fast-image';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import color from '../component/color';
import constant from '../component/constant';
import BaseScreen from '../component/BaseScreen';

var isHidden = true;

const VerifyOtp = ({navigation, route}) => {
  const bounceValue = new Animated.Value(50);

  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(59);

  const [firstVal, setFirstVal] = useState('');
  const [secondVal, setSecondVal] = useState('');
  const [thirdVal, setThirdVal] = useState('');
  const [fourVal, setFourVal] = useState('');
  const [disable, setDisable] = useState(true);

  const firstRef = useRef(null);
  const secondRef = useRef(null);
  const thirdRef = useRef(null);
  const fourRef = useRef(null);

  useEffect(() => {
    toggleSubview();
  }, []);

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  useEffect(() => {
    chkOtp();
  }, [firstVal, secondVal, thirdVal, fourVal]);

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

  const chkOtp = () => {
    const otp = `${firstVal}${secondVal}${thirdVal}${fourVal}`;
    if (otp !== undefined && otp !== null) {
      if (otp.length >= 4) {
        setDisable(false);
      } else {
        setDisable(true);
      }
    }
  };
  const getFullOtp = () => {
    const otp = `${firstVal}${secondVal}${thirdVal}${fourVal}`;

    return otp;
  };

  const _onVerifyPressed = () => {
    let finalOtp = getFullOtp();

    const register = route?.params?.paramKey;

    if (finalOtp !== null) {
      if (register !== undefined) {
        navigation.replace(constant.navMyQueue);
      } else {
        navigation.navigate(constant.navResetPassword);
      }
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const onResendOTP = () => {
    setMinutes(1);
    setSeconds(59);
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
  };

  return (
    <BaseScreen
      color={color.blue}
      StatusBarColor={color.blue}
      barStyle={'light-content'}
      translucent={Platform.OS === 'ios' ? true : false}>
      <View
        style={{
          height: hp(60),
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
            top: hp(30),
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 35,
              color: color.white,
              letterSpacing: 0.3,
              fontFamily: 'Roboto-Bold',
            }}>
            Verify OTP
          </Text>

          <Text
            style={{
              marginTop: 10,
              textAlign: 'center',
              fontSize: 16,
              color: color.white,
              lineHeight: 20,
              fontFamily: 'Roboto-Medium',
              letterSpacing: 0.5,
              // marginBottom: 75,
            }}>
            We have sent OTP to your register{`\n`}mobile number passwords.
          </Text>
        </View>
      </View>
      <Animated.View
        style={[styles.view, {transform: [{translateY: bounceValue}]}]}>
        <Text
          style={{
            textAlign: 'center',
            color: color.white,
            fontSize: 25,
            marginVertical: 20,
            fontFamily: 'Roboto-Bold',
          }}>
          - OTP Verification -
        </Text>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginHorizontal: 30,
          }}>
          <TextInput
            keyboardType="numeric"
            // textAlign="center"
            style={{
              width: 65,
              height: 65,
              borderWidth: 2,
              borderRadius: 10,
              justifyContent: 'center',
              textAlign: 'center',
              color: color.black,
              backgroundColor: color.white,
            }}
            maxLength={1}
            ref={firstRef}
            value={firstVal}
            onSubmitEditing={() => secondRef.current.focus()}
            onChangeText={text => {
              setFirstVal(text);
              if (text.length > 0) secondRef.current.focus();
            }}
            onKeyPress={({nativeEvent}) => {
              if (nativeEvent.key != 'Backspace' && firstVal.length > 0) {
                setFirstVal(nativeEvent.key);
                secondRef.current.focus();
              }
            }}
          />
          <TextInput
            keyboardType="numeric"
            // textAlign="center"
            style={{
              width: 65,
              height: 65,
              borderWidth: 2,
              borderRadius: 10,
              justifyContent: 'center',
              textAlign: 'center',
              color: color.black,
              backgroundColor: color.white,
            }}
            maxLength={1}
            ref={secondRef}
            onSubmitEditing={() => thirdRef.current.focus()}
            onChangeText={text => {
              setSecondVal(text);
              if (text.length > 0) thirdRef.current.focus();
            }}
            value={secondVal}
            onKeyPress={({nativeEvent}) => {
              if (nativeEvent.key === 'Backspace') {
                if (secondVal == '') firstRef.current.focus();
              } else if (secondVal.length > 0) {
                setSecondVal(nativeEvent.key);
                thirdRef.current.focus();
              }
            }}
          />
          <TextInput
            keyboardType="numeric"
            // textAlign="center"
            style={{
              width: 65,
              height: 65,
              borderWidth: 2,
              borderRadius: 10,
              justifyContent: 'center',
              textAlign: 'center',
              color: color.black,
              backgroundColor: color.white,
            }}
            maxLength={1}
            ref={thirdRef}
            onSubmitEditing={() => fourRef.current.focus()}
            onChangeText={text => {
              setThirdVal(text);
              if (text.length > 0) fourRef.current.focus();
            }}
            value={thirdVal}
            onKeyPress={({nativeEvent}) => {
              if (nativeEvent.key === 'Backspace') {
                if (thirdVal == '') secondRef.current.focus();
              } else if (thirdVal.length > 0) {
                setThirdVal(nativeEvent.key);
                fourRef.current.focus();
              }
            }}
          />
          <TextInput
            keyboardType="numeric"
            // textAlign="center"
            style={{
              width: 65,
              height: 65,
              borderWidth: 2,
              borderRadius: 10,
              justifyContent: 'center',
              textAlign: 'center',
              color: color.black,
              backgroundColor: color.white,
            }}
            maxLength={1}
            ref={fourRef}
            onSubmitEditing={() => Keyboard.dismiss()}
            onChangeText={text => {
              setFourVal(text);
              if (text.length > 0) Keyboard.dismiss();
            }}
            value={fourVal}
            onKeyPress={({nativeEvent}) => {
              if (nativeEvent.key === 'Backspace') {
                if (fourVal == '') thirdRef.current.focus();
              } else if (fourVal.length > 0) {
                setSixVal(nativeEvent.key);
                dismissKeyboard();
              }
            }}
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          disabled={disable}
          style={{
            // backgroundColor: color.blue,
            backgroundColor: disable === true ? color.grey : color.blue,
            marginHorizontal: 30,
            marginVertical: 20,
            borderRadius: 5,
            paddingVertical: 15,
          }}
          onPress={() => _onVerifyPressed()}>
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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 13,
          }}>
          <Text
            style={{
              fontSize: 17,
              color: color.white,
              fontFamily: 'Roboto-Regular',
              letterSpacing: 0.3,
            }}>
            Didn't get the code?
          </Text>
          {minutes === 0 && seconds === 0 ? (
            <TouchableOpacity
              onPress={() => {
                onResendOTP();
              }}>
              <Text
                style={{
                  fontSize: 17,
                  color: color.blue,
                  fontFamily: 'Roboto-Bold',
                  letterSpacing: 0.3,
                }}>
                {' '}
                Resend new code
              </Text>
            </TouchableOpacity>
          ) : (
            <Text style={{color: color.white}}>
              {' '}
              {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </Text>
          )}
        </View>
      </Animated.View>
    </BaseScreen>
  );
};

export default VerifyOtp;

const styles = StyleSheet.create({
  logoImg: {
    width: '100%',
    height: '100%',
  },
  view: {
    position: 'absolute',
    backgroundColor: color.darkBlue,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    height: hp(100),
    width: '100%',
    alignSelf: 'center',
    top: hp(50),
  },
});
