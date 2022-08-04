import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Animated,
  LayoutAnimation,
  Modal,
  TextInput,
  Platform,
} from 'react-native';
import React, {useRef, useState} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import BaseScreen from '../component/BaseScreen';
import color from '../component/color';
import Header from '../component/Header';
import {toggleAnimation} from '../component/toggleAnimation';
import {useTabBar} from '../App';

var newData = [];
let offsetY = 0;

const MyServices = () => {
  const {setShowTabBar} = useTabBar();

  const data = [
    {serviceName: 'Car Wash Exterior', time: '2 Hours'},
    {serviceName: 'Complete Car wash', time: '1 Hours'},
    {serviceName: 'Detailed interior car wash', time: '4 Hours'},
    {serviceName: 'Car Service', time: '12 Hours'},
  ];

  const [visible, setVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [popup, setPopup] = useState(false);
  const [serviceName, setServiceName] = useState();
  const [time, setTime] = useState();
  const [amount, setAmount] = useState();
  const [indexSelected, setIndexSelected] = useState();

  const animationcontrol = useRef(new Animated.Value(0)).current;
  const toggleListItem = () => {
    const config = {
      duration: 300,
      toValue: visible ? 0 : 1,
      useNativeDriver: true,
    };
    Animated.timing(animationcontrol, config).start();
    LayoutAnimation.configureNext(toggleAnimation);
    setVisible(!visible);
  };

  const arrowtransform = animationcontrol.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });

  const onSave = () => {
    let obj = {serviceName: serviceName, time: time, amount: amount};

    let count = newData.push(obj);

    if (count !== null) {
      setAmount('');
      setVisible(false);
    }
  };

  const onScrollToIndex = nativeEvent => {
    const newOffset = nativeEvent.contentOffset.y;
    if (newOffset <= 0) return setShowTabBar(true);
    offsetY < newOffset ? setShowTabBar(false) : setShowTabBar(true);
    offsetY = newOffset;
  };

  const renderItems = ({item, index}) => {
    return (
      <>
        {index === 0 ? null : <View style={styles.lineTop} />}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            setModalVisible(true),
              setServiceName(item.serviceName),
              setTime(item.time);
          }}>
          <Text style={styles.serviceName}>{item.serviceName}</Text>
        </TouchableOpacity>
      </>
    );
  };

  const renderNewItems = ({item, index}) => {
    return (
      <View
        style={[
          styles.newItemView,
          {
            marginTop: visible === true && index === 0 ? 10 : null,
          },
        ]}>
        <View style={styles.subnewItemView}>
          <Text style={styles.txtservicename}>{item.serviceName}</Text>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              setPopup(!popup), setIndexSelected(index);
            }}>
            <Entypo name="dots-three-vertical" size={20} color={color.white} />
          </TouchableOpacity>
        </View>
        <Text style={styles.txttime}>Estimated Time: {item.time}</Text>
        <View style={styles.lblAmount}>
          <Text style={styles.txtAmount}>Service Amount:</Text>
          <Text style={styles.amount}> DT {item.amount}</Text>
        </View>
        {popup === true && index === indexSelected && (
          <View style={styles.popEditandDeleteView}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.clickEditandDelete}>
              <Text style={styles.txtEditandDelete}>Edit</Text>
            </TouchableOpacity>
            <View style={[styles.lineTop]} />
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.clickEditandDelete}>
              <Text style={styles.txtEditandDelete}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return (
    <BaseScreen
      backgroundColor={color.darkBlue}
      barStyle={'light-content'}
      translucent={Platform.OS === 'ios' ? true : false}>
      <Header
        icon={true}
        title={'My Service'}
        titLeft={true}
        // whiteNew={true}
        notification={true}
      />
      <View style={styles.container}>
        <Modal
          animationType="none"
          transparent={true}
          visible={modalVisible}
          onRequ
          onRequestClose={() => {
            // Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.modalView}>
            <View style={styles.subView}>
              <Text style={styles.modaltxtService}>{serviceName}</Text>
              <Text style={styles.modaltime}>Estimated Time: {time}</Text>
              <View style={styles.modalLine} />
              <Text style={styles.modalAmount}>Add Service Amount:</Text>
              <View style={styles.textInputView}>
                <Text style={styles.modalDT}>DT</Text>
                <View style={styles.li} />
                <TextInput
                  placeholderTextColor={color.lightgrey}
                  placeholder="Amount"
                  keyboardType="numeric"
                  value={amount}
                  style={styles.modalInputAmount}
                  onChangeText={text => setAmount(text)}
                />
              </View>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.btnSave}
                onPress={() => {
                  setModalVisible(!modalVisible), onSave();
                }}>
                <Text style={styles.modalbtnSave}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <View style={styles.serviceView}>
          <View style={styles.lblservice}>
            <Text style={styles.txtselectService}>Choose ypur service</Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => toggleListItem()}>
              <Animated.View style={{transform: [{rotateZ: arrowtransform}]}}>
                <Feather name="chevron-right" color={color.grey} size={25} />
              </Animated.View>
            </TouchableOpacity>
          </View>

          {visible === true && (
            <FlatList
              data={data}
              alwaysBounceVertical={false}
              showsVerticalScrollIndicator={false}
              bounces={false}
              contentContainerStyle={[styles.FlatListView]}
              renderItem={renderItems}
            />
          )}
        </View>
        <FlatList
          data={newData}
          // contentContainerStyle={{position: 'absolute'}}
          keyExtractor={(item, index) => index}
          scrollEventThrottle={16}
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}
          bounces={false}
          onScroll={({nativeEvent}) => onScrollToIndex(nativeEvent)}
          renderItem={renderNewItems}
        />
      </View>
    </BaseScreen>
  );
};

export default MyServices;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: color.white},
  lblservice: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 15,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    borderColor: color.grey,
    backgroundColor: color.white,
  },
  FlatListView: {
    marginHorizontal: 15,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 10,
  },
  lineTop: {
    borderWidth: 0.8,
    borderColor: color.line1,
    marginHorizontal: 10,
  },
  modalView: {
    flex: 1,
    backgroundColor: 'rgba(85, 99, 124,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subView: {
    width: wp(90),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    // marginHorizontal: 15,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: color.white,
    borderRadius: 5,
  },
  btnSave: {
    backgroundColor: color.darkBlue,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    marginHorizontal: 20,
    marginBottom: 28,
    borderRadius: 3,
  },
  li: {
    height: 10,
    width: 1.5,
    backgroundColor: color.grey,
    marginHorizontal: 13,
  },
  textInputView: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderRadius: 5,
    borderWidth: 0.5,
    marginHorizontal: 20,
    marginBottom: 15,
    borderColor: color.lightgrey,
    paddingLeft: 20,
    paddingVertical: Platform.OS === 'ios' ? 10 : null,
  },
  popText: {color: color.black},
  popView: {
    position: 'absolute',
    // backgroundColor: color.white,
    backgroundColor: 'red',
    right: 10,
    top: 28,
    // height: hp(10),
    // width: wp(30),
    borderRadius: 5,
  },
  popbtnView: {
    backgroundColor: 'pink',
  },
  serviceName: {
    paddingVertical: 15,
    paddingLeft: 10,
    fontFamily: 'Roboto-Regular',
    color: color.darkgrey,
  },
  newItemView: {
    backgroundColor: color.blue,
    marginHorizontal: 15,
    borderRadius: 5,
    marginBottom: 15,
  },
  subnewItemView: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 20,
  },
  txtservicename: {
    color: color.white,
    fontSize: 30,
    fontFamily: 'Roboto-Bold',
    letterSpacing: 0.5,
  },
  txttime: {
    color: color.white,
    marginLeft: 20,
    fontSize: 15,
    marginVertical: 10,
    fontFamily: 'Roboto-Medium',
    letterSpacing: 0.3,
  },
  lblAmount: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginLeft: 20,
  },
  txtAmount: {
    color: color.white,
    fontSize: 15,
    fontFamily: 'Roboto-Medium',
  },
  amount: {
    color: color.white,
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
  },
  popEditandDeleteView: {
    position: 'absolute',
    right: 30,
    top: 53,
    backgroundColor: color.white,
    width: wp(30),
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  txtEditandDelete: {
    color: color.lightgrey,
    fontFamily: 'Roboto-Regular',
  },
  clickEditandDelete: {marginLeft: 15, marginVertical: 15},
  modaltxtService: {
    fontSize: 28,
    paddingLeft: 20,
    paddingTop: 20,
    fontFamily: 'Roboto-Regular',
  },
  modaltime: {
    paddingLeft: 20,
    paddingVertical: 10,
    fontFamily: 'Roboto-Regular',
    letterSpacing: 0.5,
    color: color.darkgrey,
  },
  modalLine: {
    borderWidth: 1,
    borderColor: color.linecolor,
    marginHorizontal: 20,
  },
  modalAmount: {
    paddingLeft: 20,
    paddingVertical: 10,
    color: color.grey,
    fontFamily: 'Roboto-Regular',
    letterSpacing: 0.5,
    fontSize: 16,
  },
  modalDT: {
    color: color.blue,
    fontFamily: 'Roboto-Bold',
    // letterSpacing: 0.5,
  },
  modalInputAmount: {
    color: color.darkgrey,
    fontFamily: 'Roboto-Bold',
    // letterSpacing: 0.5,
  },
  modalbtnSave: {
    color: color.white,
    fontFamily: 'Roboto-Bold',
    fontSize: 18,
  },
  serviceView: {
    justifyContent: 'center',
    backgroundColor: '#f7f7f7',
    paddingBottom: 10,
    marginBottom: 10,
  },
  txtselectService: {
    fontFamily: 'Roboto-Regular',
    color: color.lightgrey,
    fontSize: 15,
  },
});
