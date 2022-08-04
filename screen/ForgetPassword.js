import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Animated,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FastImage from 'react-native-fast-image';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CountryPicker from 'react-native-country-picker-modal';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

import color from '../component/color';
import constant from '../component/constant';
import BaseScreen from '../component/BaseScreen';
import {mobileValidator} from '../helper/Validator';

var isHidden = true;

const ForgetPassword = ({navigation}) => {
  const bounceValue = new Animated.Value(55);

  const withFilter = true;
  const [countryCode, setCountryCode] = useState('TN');
  // const [country, setCountry] = useState(null);
  const [withFlag, setWithFlag] = useState(true);
  const [mobileNo, setMobileNo] = useState({value: '', error: ''});

  const [withCallingCode, setWithCallingCode] = useState(216);

  useEffect(() => {
    toggleSubview();
  }, []);

  const onSelect = country => {
    setCountryCode(country.cca2);
    // setCountry(country);
    // setWithFilter()
    setWithCallingCode(country.callingCode);
    setWithFlag(country.flag);
  };
  const onForget = async () => {
    const mobileError = mobileValidator(mobileNo.value);

    if (mobileError) {
      setMobileNo({...mobileNo, error: mobileError});
    } else {
      //   await AsyncStorage.setItem('user', mobileNo?.value);
      navigation.navigate(constant.navVerifyOtp);
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
      <View style={styles.main}>
        <FastImage
          source={require('../component/image/Illustretion_Login.png')}
          style={styles.logoImg}
          resizeMode={FastImage.resizeMode.stretch}
        />
        <View
          style={{
            position: 'absolute',
          }}>
          <Text style={styles.txtforget}>Forgot your{'\n'} Password?</Text>

          <Text style={styles.txtreset}>
            Just enter the phone number you've{`\n`}used to register with us and
            we'll{`\n`}send you a reset link!
          </Text>
        </View>
      </View>
      <Animated.View
        style={[styles.container, {transform: [{translateY: bounceValue}]}]}>
        <Text style={styles.txtchange}>- Change Password -</Text>
        <View style={styles.subMain}>
          <View style={styles.lblnumber}>
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
          <View style={styles.line} />
          <TextInput
            placeholder="Enter Phone Number"
            keyboardType="numeric"
            placeholderTextColor={color.lightgrey}
            // textAlign="center"
            style={styles.textInput}
            maxLength={10}
            value={mobileNo.value}
            onChangeText={text => setMobileNo({value: text, error: ''})}
          />
        </View>
        {mobileNo.error ? (
          <Text style={[styles.errTxt, {marginTop: 10}]}>{mobileNo.error}</Text>
        ) : null}
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.btnSubmit}
          onPress={() => {
            onForget();
          }}>
          <View style={styles.view1}>
            <Text style={styles.txtsubmit}>Submit</Text>
            <View style={styles.subView1}>
              <View style={styles.li} />
              <AntDesign
                name="caretright"
                size={18}
                color={color.white}
                style={{marginLeft: 20}}
              />
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.view2}>
          <View style={styles.lines} />
          <Text style={styles.txtOR}>or</Text>
          <View style={styles.lines} />
        </View>
        <View style={styles.view3}>
          <Text style={styles.txtgo}>Go Back to</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              navigation.goBack(constant.navLoginScreen);
            }}>
            <Text style={styles.lblLogin}> Login</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </BaseScreen>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  logoImg: {
    width: '100%',
    height: '100%',
  },
  main: {flex: 0.6, alignItems: 'center', justifyContent: 'center'},
  txtforget: {
    textAlign: 'center',
    fontSize: 35,
    color: color.white,
    fontFamily: 'Roboto-Bold',
    letterSpacing: 0.5,
  },
  txtreset: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 16,
    color: color.white,
    lineHeight: 20,
    fontFamily: 'Roboto-Medium',
    marginBottom: 75,
  },
  container: {
    position: 'absolute',
    backgroundColor: color.darkBlue,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    height: hp(100),
    top: '55%',
    width: '100%',
    alignSelf: 'center',
  },
  txtchange: {
    textAlign: 'center',
    color: color.white,
    fontSize: 25,
    marginVertical: 20,
    fontFamily: 'Roboto-Medium',
  },
  subMain: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-around',
    backgroundColor: color.white,
    marginHorizontal: 30,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  lblnumber: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  line: {
    height: 10,
    width: 1,
    backgroundColor: color.grey,
    marginHorizontal: 10,
  },
  textInput: {
    backgroundColor: color.white,
    fontFamily: 'Roboto-Regular',
    color: color.black,
    // letterSpacing: 0.5,
  },
  btnSubmit: {
    backgroundColor: color.blue,
    marginHorizontal: 30,
    marginTop: 10,
    borderRadius: 5,
    paddingVertical: 10,
  },
  lines: {backgroundColor: color.white, width: '25%', height: 0.5},
  txtOR: {
    color: color.white,
    fontSize: 15,
    fontWeight: '700',
    marginHorizontal: 15,
  },
  view1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  txtsubmit: {
    color: color.white,
    fontFamily: 'Roboto-Bold',
    fontSize: 17,
    letterSpacing: 0.3,
  },
  subView1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  li: {
    height: 30,
    backgroundColor: color.white,
    width: 1,
    borderRadius: 10,
  },
  view2: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginVertical: 20,
    marginHorizontal: 50,
  },
  view3: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  txtgo: {
    fontSize: 17,
    color: color.white,
    fontFamily: 'Roboto-Regular',
    letterSpacing: 0.3,
  },
  lblLogin: {
    fontSize: 17,
    color: color.blue,
    fontFamily: 'Roboto-Bold',
    letterSpacing: 0.3,
  },
  errTxt: {color: color.lightRed, marginLeft: 30},
});
