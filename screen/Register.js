import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Platform,
  Animated,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FastImage from 'react-native-fast-image';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import CountryPicker from 'react-native-country-picker-modal';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

import color from '../component/color';
import constant from '../component/constant';
import BaseScreen from '../component/BaseScreen';
import {
  mobileValidator,
  nameValidator,
  passwordValidator,
} from '../helper/Validator';

var isHidden = true;

const Register = ({navigation}) => {
  const withFilter = true;

  const bounceValue = new Animated.Value(45);

  const [countryCode, setCountryCode] = useState('TN');
  // const [country, setCountry] = useState(null);
  const [withFlag, setWithFlag] = useState(true);
  const [withCallingCode, setWithCallingCode] = useState(216);

  const [mobileNo, setMobileNo] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});
  const [name, setName] = useState({value: '', error: ''});

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

  const onSelect = country => {
    setCountryCode(country.cca2);
    // setCountry(country);
    // setWithFilter()
    setWithCallingCode(country.callingCode);
    setWithFlag(country.flag);
  };

  const onNextStep = async () => {
    const nameError = nameValidator(name.value);
    const mobileError = mobileValidator(mobileNo.value);
    const passwordError = passwordValidator(password.value);

    if (nameError) {
      setName({...name, error: nameError});
    } else if (mobileError) {
      setMobileNo({...mobileNo, error: mobileError});
      return;
    } else if (passwordError) {
      setPassword({...password, error: passwordError});
      return;
    } else {
      await AsyncStorage.setItem('user', mobileNo?.value);
      navigation.navigate(constant.navServiceRegister);
    }
  };

  return (
    <BaseScreen
      color={color.blue}
      StatusBarColor={color.blue}
      barStyle={'light-content'}
      translucent={Platform.OS === 'ios' ? true : false}>
      <View style={styles.imageView}>
        <FastImage
          source={require('../component/image/Illustretion_Login.png')}
          style={styles.logoImg}
          resizeMode={FastImage.resizeMode.stretch}
        />
        <View
          style={{
            position: 'absolute',
          }}>
          <Text style={styles.txt}>
            Just a few steps to{`\n`}register yourself!
          </Text>
        </View>
      </View>
      <Animated.View
        style={[styles.inputsView, {transform: [{translateY: bounceValue}]}]}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          bounces={false}
          showsVerticalScrollIndicator={false}>
          <TextInput
            placeholder="Name"
            // textAlign="center"
            placeholderTextColor={color.lightgrey}
            style={styles.input1}
            value={name.value}
            onChangeText={text => setName({value: text, error: ''})}
          />
          {name.error ? (
            <Text style={[styles.errTxt, {marginTop: 10}]}>{name.error}</Text>
          ) : null}
          <View style={styles.input2}>
            <View style={styles.subinput2}>
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
            <View style={styles.line1} />
            <TextInput
              placeholder="Enter Phone Number"
              placeholderTextColor={color.lightgrey}
              keyboardType="numeric"
              style={styles.subinputView2}
              value={mobileNo.value}
              onChangeText={text => setMobileNo({value: text, error: ''})}
              maxLength={10}
            />
          </View>
          {mobileNo.error ? (
            <Text style={[styles.errTxt, {marginBottom: 10}]}>
              {mobileNo.error}
            </Text>
          ) : null}
          <TextInput
            placeholder="Password"
            // keyboardType="numeric"
            placeholderTextColor={color.lightgrey}
            secureTextEntry
            style={styles.input3}
            value={password.value}
            onChangeText={text => setPassword({value: text, error: ''})}
          />
          {password.error ? (
            <Text style={[styles.errTxt, {marginTop: 10}]}>
              {password.error}
            </Text>
          ) : null}
          <View style={styles.line2} />
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.btnView}
            onPress={() => {
              onNextStep();
            }}>
            <View style={styles.btnsubView}>
              <Text
                style={{
                  color: color.white,
                  fontFamily: 'Roboto-Bold',
                  fontSize: 17,
                  letterSpacing: 0.3,
                }}>
                Next
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View style={styles.line3} />
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
              marginVertical: 15,
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
          <Text style={styles.txt1}>By continuing, you agree to our</Text>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              marginVertical: 15,
            }}>
            <Text style={styles.txt2}>Terms of Service</Text>
            <View
              style={{
                height: 10,
                backgroundColor: color.white,
                width: 1,
                borderRadius: 10,
                marginHorizontal: 5,
              }}
            />
            <Text style={styles.txt2}>Privacy Policy</Text>
          </View>
          <View style={{height: hp(5), marginVertical: 10}} />
        </ScrollView>
      </Animated.View>
    </BaseScreen>
  );
};

export default Register;

const styles = StyleSheet.create({
  logoImg: {
    width: '100%',
    height: '100%',
  },
  imageView: {
    height: hp(50),
    alignItems: 'center',
    // justifyContent: 'flex-end',
    justifyContent: 'center',
  },
  txt: {
    textAlign: 'center',
    fontSize: 35,
    color: color.white,
    fontFamily: 'Roboto-Bold',

    letterSpacing: 0.5,
  },
  inputsView: {
    position: 'absolute',
    backgroundColor: color.darkBlue,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    height: hp(60),
    width: '100%',
    alignSelf: 'center',
    top: '45%',
  },
  input1: {
    backgroundColor: color.white,
    borderRadius: 5,
    marginHorizontal: 30,
    marginTop: 25,
    paddingLeft: 15,
    paddingVertical: 10,
    color: color.black,
    fontFamily: 'Roboto-Regular',
    // letterSpacing: 0.3,
  },
  input2: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: color.white,
    marginHorizontal: 30,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  subinput2: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  line1: {
    height: 10,
    width: 1,
    backgroundColor: color.grey,
    marginHorizontal: 10,
  },
  subinputView2: {
    backgroundColor: color.white,
    fontFamily: 'Roboto-Regular',
    // letterSpacing: 0.3,
    color: color.black,
  },
  input3: {
    backgroundColor: color.white,
    borderRadius: 5,
    marginHorizontal: 30,
    paddingLeft: 15,
    paddingVertical: 10,
    color: color.black,
    fontFamily: 'Roboto-Regular',
    // letterSpacing: 0.3,
  },
  line2: {
    width: '30%',
    borderRadius: 30,
    height: 2,
    backgroundColor: color.white,
    alignSelf: 'center',
    marginVertical: 20,
  },
  btnView: {
    backgroundColor: color.blue,
    marginHorizontal: 30,
    borderRadius: 5,
    paddingVertical: 10,
  },
  btnsubView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  line3: {
    height: 30,
    backgroundColor: color.white,
    width: 1,
    borderRadius: 10,
  },
  txt1: {
    color: color.white,
    fontFamily: 'Roboto-Bold',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  txt2: {
    color: color.white,
    fontFamily: 'Roboto-Bold',
    letterSpacing: 0.5,
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontSize: 11,
  },
  errTxt: {color: color.lightRed, marginLeft: 30},
});
