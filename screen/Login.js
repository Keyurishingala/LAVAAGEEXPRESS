import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Platform,
  ScrollView,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import FastImage from 'react-native-fast-image';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Zocial from 'react-native-vector-icons/Zocial';
import CountryPicker from 'react-native-country-picker-modal';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

import color from '../component/color';
import constant from '../component/constant';
import BaseScreen from '../component/BaseScreen';
import {mobileValidator, passwordValidator} from '../helper/Validator';

var isHidden = true;

const Login = ({navigation}) => {
  const withFilter = true;
  const bounceValue = new Animated.Value(70);
  const [countryCode, setCountryCode] = useState('TN');
  // const [country, setCountry] = useState(null);
  const [withFlag, setWithFlag] = useState(true);

  const [mobileNo, setMobileNo] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});

  const [withCallingCode, setWithCallingCode] = useState(216);
  const onSelect = country => {
    setCountryCode(country.cca2);
    // setCountry(country);
    // setWithFilter()
    setWithCallingCode(country.callingCode);
    setWithFlag(country.flag);
  };

  // const fadeAnim = useRef(new Animated.Value(0)).current;

  // const fadeIn = () => {
  //   // Will change fadeAnim value to 1 in 5 seconds
  //   Animated.timing(fadeAnim, {
  //     toValue: 1,
  //     duration: 5000,
  //     useNativeDriver: true, // Add This line
  //   }).start();
  // };

  // useEffect(() => {
  //   fadeIn();
  // }, []);

  useEffect(() => {
    toggleSubview();
  }, []);

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

  const onProceed = async () => {
    const mobileError = mobileValidator(mobileNo.value);
    const passwordError = passwordValidator(password.value);

    if (mobileError) {
      setMobileNo({...mobileNo, error: mobileError});
      return;
    } else if (passwordError) {
      setPassword({...password, error: passwordError});
      return;
    } else {
      await AsyncStorage.setItem('user', mobileNo?.value);
      navigation.replace(constant.navMyQueue);

      // navigation.dispatch(StackActions.replace(constant.navMyQueue));
    }
  };

  return (
    <BaseScreen
      color={color.blue}
      StatusBarColor={color.blue}
      barStyle={'light-content'}
      translucent={Platform.OS === 'ios' ? true : false}>
      <View style={styles.img}>
        <FastImage
          source={require('../component/image/Illustretion_Login.png')}
          style={styles.logoImg}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={{position: 'absolute'}}>
          <Text style={styles.txtWcl}>Welcome, User</Text>

          <Text style={styles.txtGSL}>
            Want your car serviced?{`\n`}Get Started Below
          </Text>
        </View>
      </View>
      <Animated.View
        style={[styles.main, {transform: [{translateY: bounceValue}]}]}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          bounces={false}
          showsVerticalScrollIndicator={false}>
          <Text style={styles.txtlogin}>- Login -</Text>
          <View style={styles.submain1}>
            <View style={styles.view1}>
              <CountryPicker
                {...{
                  countryCode,
                  withFlag,
                  withCallingCode,
                  withFilter,
                  onSelect,
                }}
                // visible
              />
              <Text>+{withCallingCode}</Text>
            </View>
            <View style={styles.li} />
            <TextInput
              placeholder="Enter Phone Number"
              keyboardType="numeric"
              placeholderTextColor={color.lightgrey}
              value={mobileNo.value}
              onChangeText={text => setMobileNo({value: text, error: ''})}
              // textAlign="center"
              style={styles.input1}
              maxLength={10}
            />
          </View>
          {mobileNo.error ? (
            <Text style={[styles.errTxt, {marginTop: 10}]}>
              {mobileNo.error}
            </Text>
          ) : null}
          <View style={styles.submain2}>
            <TextInput
              placeholder="Password"
              // keyboardType="numeric"
              // textAlign="center"
              secureTextEntry
              placeholderTextColor={color.lightgrey}
              value={password.value}
              onChangeText={text => setPassword({value: text, error: ''})}
              style={styles.input2}
            />

            <TouchableOpacity
              onPress={() => {
                navigation.navigate(constant.navForgetPassword);
              }}>
              <Text style={styles.btnFoget}>Forget Password?</Text>
            </TouchableOpacity>
          </View>
          {password.error ? (
            <Text style={[styles.errTxt, {marginBottom: 10}]}>
              {password.error}
            </Text>
          ) : null}
          <TouchableOpacity
            onPress={() => onProceed()}
            activeOpacity={0.7}
            style={styles.btnProceed}>
            <View style={styles.view2}>
              <Text style={styles.txtProceed}>Proceed</Text>
              <View style={styles.btnRight}>
                <View style={styles.lines} />
                <AntDesign
                  name="caretright"
                  size={18}
                  color={color.white}
                  style={{marginLeft: 20}}
                />
              </View>
            </View>
          </TouchableOpacity>
          <View style={styles.submain3}>
            <View style={styles.line} />
            <Text
              style={{
                color: color.white,
                fontSize: 17,
                fontFamily: 'Roboto-Bold',
                letterSpacing: 0.3,
              }}>
              Login or Sign up
            </Text>
            <View style={styles.line} />
          </View>
          <View style={styles.submain4}>
            <TouchableOpacity activeOpacity={0.7} style={styles.btnFacebook}>
              <MaterialIcons name="facebook" size={40} color={color.white} />
            </TouchableOpacity>
            {Platform.OS === 'ios' ? (
              <TouchableOpacity activeOpacity={0.7} style={styles.btnApple}>
                {<Zocial name="appstore" size={40} />}
              </TouchableOpacity>
            ) : null}
          </View>
          <View style={styles.submain5}>
            <Text style={styles.lbl1}>Don't have an account?</Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                navigation.navigate(constant.navRegister);
              }}>
              <Text style={styles.btnSignup}> Signup</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Octicons name="dot-fill" size={15} color={color.white} />
            <Octicons
              name="dot-fill"
              size={15}
              color={color.white}
              style={{marginHorizontal: 13}}
            />
            <Octicons name="dot-fill" size={15} color={color.white} />
          </View>
          <Text style={styles.lbl2}>By continuing, you agree to our</Text>
          <View style={styles.submain6}>
            <Text style={styles.txtTCM}>Terms of Service</Text>
            <View style={styles.line2} />
            <Text style={styles.txtprv}>Privacy Policy</Text>
          </View>
          <View style={{height: hp(5), marginVertical: 10}} />
        </ScrollView>
      </Animated.View>
    </BaseScreen>
  );
};

export default Login;

const styles = StyleSheet.create({
  logoImg: {
    width: '100%',
    height: '100%',
  },
  img: {
    alignItems: 'center',
    justifyContent: 'center',
    height: hp(35),
  },
  txtWcl: {
    fontSize: 35,
    textAlign: 'center',
    color: color.white,
    fontFamily: 'Roboto-Bold',
    letterSpacing: 0.5,
  },
  txtGSL: {
    textAlign: 'center',
    color: color.white,
    fontSize: 15,
    // marginVertical: 10,
    letterSpacing: 0.5,
    // opacity: fadeAnim,
    fontFamily: 'Roboto-Medium',
  },
  main: {
    position: 'absolute',
    backgroundColor: color.darkBlue,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    height: hp(70),
    width: '100%',
    top: hp(30),
    alignSelf: 'center',
    // top: 0,
  },
  txtlogin: {
    textAlign: 'center',
    color: color.white,
    fontSize: 25,
    marginVertical: 20,
    // fontFamily: 'ProximaNovaSemibold',
  },
  submain1: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: color.white,
    marginHorizontal: 30,
    borderRadius: 5,
  },
  view1: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginLeft: 10,
  },
  li: {
    height: 10,
    width: 1,
    backgroundColor: color.grey,
    marginHorizontal: 10,
  },
  input1: {
    backgroundColor: color.white,
    color: color.black,
    fontFamily: 'Roboto-Regular',
    // letterSpacing: 0.5,
  },
  submain2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: color.white,
    marginVertical: 10,
    marginHorizontal: 30,
    borderRadius: 5,
  },
  input2: {
    backgroundColor: color.white,
    width: wp(50),
    marginLeft: 10,
    fontFamily: 'Roboto-Regular',
    // letterSpacing: 0.5,
    paddingVertical: 10,
    color: color.black,
  },
  btnFoget: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'Roboto-Light',
    letterSpacing: 0.5,
    marginRight: 15,
  },
  btnProceed: {
    backgroundColor: color.blue,
    marginHorizontal: 30,
    borderRadius: 5,
    paddingVertical: 10,
  },
  view2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  txtProceed: {
    color: color.white,
    letterSpacing: 0.5,
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
  },
  btnRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lines: {
    height: 30,
    backgroundColor: color.white,
    width: 1,
    borderRadius: 10,
  },
  submain3: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: 20,
    marginHorizontal: 50,
  },
  line: {backgroundColor: color.white, width: '25%', height: 0.5},
  submain4: {
    flexDirection: Platform.OS === 'ios' ? 'row' : null,
    alignItems: 'center',
    justifyContent: Platform.OS === 'ios' ? 'space-between' : 'center',
    marginHorizontal: 30,
  },
  btnFacebook: {
    backgroundColor: color.facebook,
    height: 60,
    width: Platform.OS === 'ios' ? '48%' : '100%',
    alignItems: 'center',
    borderRadius: 5,
    justifyContent: 'center',
  },
  btnApple: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.apple,
    height: 60,
    width: '48%',
    borderRadius: 5,
  },
  submain5: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginVertical: 15,
  },
  lbl1: {
    fontSize: 17,
    color: color.white,
    fontFamily: 'Roboto-Regular',
    letterSpacing: 0.5,
  },
  btnSignup: {
    fontSize: 17,
    color: color.blue,
    fontFamily: 'Roboto-Bold',
    letterSpacing: 0.3,
  },
  lbl2: {
    color: color.white,
    textAlign: 'center',
    marginVertical: 17,
    fontFamily: 'Roboto-Bold',
    letterSpacing: 0.5,
  },
  submain6: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  txtTCM: {
    color: color.white,
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontSize: 11,
    fontFamily: 'Roboto-Bold',
    letterSpacing: 0.5,
  },
  line2: {
    height: 10,
    backgroundColor: color.white,
    width: 1,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  txtprv: {
    color: color.white,
    fontFamily: 'Roboto-Bold',
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontSize: 11,
    letterSpacing: 0.5,
  },
  errTxt: {color: color.lightRed, marginLeft: 30},
});
