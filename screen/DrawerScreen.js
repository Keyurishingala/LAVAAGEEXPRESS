import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import colors from '../component/color';
import constant from '../component/constant';
const DrawerScreen = ({navigation}) => {
  const CommonView = ({onPress, img, title, icon, color, paddingBottom}) => {
    return (
      <TouchableOpacity
        style={{marginHorizontal: 20, marginVertical: 10}}
        activeOpacity={0.6}
        onPress={onPress}>
        <View>
          <Text style={{color: colors.white, fontSize: 20}}>{title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={style.MainContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        style={{flex: 1}}>
        <CommonView
          // onPress={() => navigation.navigate(Constant.navInviteScreen)}
          // img={SvgConstant.share1}
          title={'Share & Earn'}
        />
        <CommonView
          // onPress={() => navigation.navigate(Constant.navFitnessReport)}
          // img={SvgConstant.myReport1}
          title={'My Report'}
        />
        <CommonView
          onPress={() => {
            AsyncStorage.removeItem('user');
            navigation.navigate(constant.navLoginScreen);
          }}
          // img={SvgConstant.track1}
          title={'Logout'}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default DrawerScreen;

const style = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: colors.darkBlue,
  },
});
