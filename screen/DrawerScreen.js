// import {
//   View,
//   Text,
//   ScrollView,
//   StyleSheet,
//   SafeAreaView,
//   TouchableOpacity,
// } from 'react-native';
// import React from 'react';
// import {DrawerContentScrollView} from '@react-navigation/drawer';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// import colors from '../component/color';
// import constant from '../component/constant';
// const DrawerScreen = ({navigation}) => {
//   const CommonView = ({onPress, img, title, icon, color, paddingBottom}) => {
//     return (
//       <TouchableOpacity
//         style={{marginHorizontal: 20, marginVertical: 10}}
//         activeOpacity={0.6}
//         onPress={onPress}>
//         <View>
//           <Text style={{color: colors.white, fontSize: 20}}>{title}</Text>
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <SafeAreaView style={style.MainContainer}>
//       <DrawerContentScrollView>
//         <CommonView
//           // onPress={() => navigation.navigate(Constant.navInviteScreen)}
//           // img={SvgConstant.share1}
//           title={'Share & Earn'}
//         />
//         <CommonView
//           // onPress={() => navigation.navigate(Constant.navFitnessReport)}
//           // img={SvgConstant.myReport1}
//           title={'My Report'}
//         />
//         <CommonView
//           onPress={() => {
//             // AsyncStorage.removeItem('user');
//             navigation.navigate(constant.navLoginScreen);
//           }}
//           // img={SvgConstant.track1}
//           title={'Logout'}
//         />
//       </DrawerContentScrollView>
//     </SafeAreaView>
//   );
// };

// export default DrawerScreen;

// const style = StyleSheet.create({
//   MainContainer: {
//     flex: 1,
//     backgroundColor: colors.darkBlue,
//   },
// });

import {View, Text} from 'react-native';
import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

const DrawerScreen = props => {
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </View>
  );
};

export default DrawerScreen;
