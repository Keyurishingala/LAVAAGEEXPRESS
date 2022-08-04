import React from 'react';

import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  Platform,
  Dimensions as dm,
} from 'react-native';
import color from './color';
import helper from '../helper/IphoneX';

const STATUSBAR_HEIGHT =
  Platform.OS === 'ios' ? (helper.isIphoneX() ? 40 : 24) : 0;

const BaseScreen = ({...props}) => {
  return (
    <SafeAreaView
      style={[
        styles.container,
        {backgroundColor: props.color ? props.color : color.darkBlue},
      ]}>
      <View
        style={{
          // height: STATUSBAR_HEIGHT,
          backgroundColor: color.darkBlue,
        }}>
        <StatusBar
          backgroundColor={
            props.StatusBarColor ? props.StatusBarColor : color.darkBlue
          }
          barStyle={props.barStyle}
          translucent={props.translucent}
        />
      </View>
      {props.children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
    // backgroundColor: color.darkBlue,
  },
});

export default BaseScreen;
