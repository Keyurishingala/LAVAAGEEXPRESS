import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  PermissionsAndroid,
  Platform,
  ScrollView,
  ToastAndroid,
  Alert,
  Linking,
  Animated,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FastImage from 'react-native-fast-image';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {StackActions} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Geolocation from 'react-native-geolocation-service';

import color from '../component/color';
import constant from '../component/constant';
import BaseScreen from '../component/BaseScreen';
// import appConfig from '../app.json';

import {businessNameValidator} from '../helper/Validator';
import GMapView from '../component/GMapView';

var isHidden = true;

const ServiceRegister = ({navigation}) => {
  const reg = 'Register';

  const [location, setLocation] = useState(null);
  const bounceValue = new Animated.Value(45);

  const [name, setName] = useState({value: '', error: ''});

  useEffect(() => {
    toggleSubview();
  }, []);

  useEffect(() => {
    getLocation();
    return () => {
      Geolocation.clearWatch();
    };
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

  const onSignUp = () => {
    const nameError = businessNameValidator(name.value);

    if (nameError) {
      setName({...name, error: nameError});
    } else {
      navigation.navigate(constant.navVerifyOtp, {paramKey: reg});
    }
  };

  const hasLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const hasPermission = await hasPermissionIOS();
      return hasPermission;
    }

    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG,
      );
    }

    return false;
  };

  const hasPermissionIOS = async () => {
    const openSetting = () => {
      Linking.openSettings().catch(() => {
        Alert.alert('Unable to open settings');
      });
    };
    const status = await Geolocation.requestAuthorization('whenInUse');

    if (status === 'granted') {
      return true;
    }

    if (status === 'denied') {
      Alert.alert('Location permission denied');
    }

    if (status === 'disabled') {
      Alert.alert(
        `Turn on Location Services to allow "${appConfig.displayName}" to determine your location.`,
        '',
        [
          {text: 'Go to Settings', onPress: openSetting},
          {text: "Don't Use Location", onPress: () => {}},
        ],
      );
    }

    return false;
  };

  const getLocation = async () => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      return;
    }

    Geolocation.getCurrentPosition(
      position => {
        setLocation(position);
      },
      error => {
        Alert.alert(`Code ${error.code}`, error.message);
        setLocation(null);
      },
      {
        accuracy: {
          android: 'high',
          ios: 'best',
        },
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        distanceFilter: 0,
        forceRequestLocation: true,
        // forceLocationManager: useLocationManager,
        showLocationDialog: true,
      },
    );
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
          justifyContent: 'center',
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
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 35,
              color: color.white,
              letterSpacing: 0.3,
              fontFamily: 'Roboto-Bold',
            }}>
            You are{'\n'}almost there
          </Text>

          <Text
            style={{
              marginTop: 20,
              textAlign: 'center',
              fontSize: 17,
              color: color.white,
              lineHeight: 20,
              fontFamily: 'Roboto-Medium',
              marginBottom: 75,
              letterSpacing: 0.5,
            }}>
            Provide your service center details{`\n`}and Location
          </Text>
        </View>
      </View>
      <Animated.View
        style={[
          styles.view,
          {
            transform: [{translateY: bounceValue}],
          },
        ]}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          bounces={false}
          showsVerticalScrollIndicator={false}>
          <TextInput
            placeholder=" Business Name"
            placeholderTextColor={color.lightgrey}
            style={{
              backgroundColor: color.white,
              fontFamily: 'Roboto-Regular',
              // letterSpacing: 0.5,
              marginHorizontal: 30,
              borderRadius: 5,
              paddingVertical: 10,
              marginTop: 25,
              paddingLeft: 15,
              color: color.black,
            }}
            value={name.value}
            onChangeText={text => setName({value: text, error: ''})}
          />
          {name.error ? (
            <Text style={[styles.errTxt, {marginTop: 10}]}>{name.error}</Text>
          ) : null}
          <View
            style={{
              backgroundColor: 'white',
              alignItems: 'center',
              justifyContent: 'center',
              marginHorizontal: 30,
              marginTop: 10,
              borderRadius: 5,
              overflow: 'hidden',
            }}>
            <GMapView coords={location?.coords || null} />
          </View>
          <View
            style={{
              width: '30%',
              borderRadius: 30,
              height: 2,
              backgroundColor: color.white,
              alignSelf: 'center',
              marginVertical: 20,
            }}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              backgroundColor: color.blue,
              marginHorizontal: 30,
              borderRadius: 5,
              paddingVertical: 10,
            }}
            onPress={() => {
              onSignUp();
            }}>
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
                  letterSpacing: 0.5,
                  fontSize: 16,
                  fontFamily: 'Roboto-Bold',
                }}>
                Proceed
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
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              marginTop: 30,
            }}>
            <Text
              style={{
                fontSize: 17,
                color: color.white,
                fontFamily: 'Roboto-Regular',
                letterSpacing: 0.5,
              }}>
              Already have an account?
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                navigation.replace(constant.navLoginScreen);
              }}>
              <Text
                style={{
                  fontSize: 17,

                  color: color.blue,
                  fontFamily: 'Roboto-Bold',
                  letterSpacing: 0.3,
                }}>
                {' '}
                Login
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{height: hp(5), marginVertical: 10}} />
        </ScrollView>
      </Animated.View>
    </BaseScreen>
  );
};

export default ServiceRegister;

const styles = StyleSheet.create({
  logoImg: {
    width: wp('100%'),
    height: hp('50%'),
  },
  map: {
    height: hp(25),
    width: '100%',
  },
  errTxt: {color: color.lightRed, marginLeft: 30},
  view: {
    position: 'absolute',
    backgroundColor: color.darkBlue,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    height: hp(60),
    width: '100%',
    alignSelf: 'center',
    top: '45%',
  },
});
