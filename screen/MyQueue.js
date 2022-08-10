import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  TextInput,
  Platform,
  // FlatList,
  Modal,
  Alert,
  Linking,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DatePicker from 'react-native-date-picker';
import Octicons from 'react-native-vector-icons/Octicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import {inject, observer} from 'mobx-react';

import BaseScreen from '../component/BaseScreen';
import color from '../component/color';
import Header from '../component/Header';
import {useTabBar} from '../App';
import constant from '../component/constant';
import common from '../helper/common';

let offsetY = 0;

const MyQueue = ({navigation}) => {
  const {setShowTabBar} = useTabBar();

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [names, setnames] = useState();

  const [data, setData] = useState([
    {
      name: 'Femil Sabhaya',
      time: '12:00 PM',
      car: 'Mitsubishi Lenecer',
      make: 'Apr 2011',
      color: 'Glossy Red',
      no: '1CUS775',
      servicetime: '3 Hours',
    },
    {
      name: 'Dharmik Vora',
      time: '12:00 PM',
      car: 'Mitsubishi Lenecer',
      make: 'Apr 2011',
      color: 'Glossy Red',
      no: '1CUS775',
      servicetime: '3 Hours',
    },
    {
      name: 'Femil Sabhaya',
      time: '12:00 PM',
      car: 'Mitsubishi Lenecer',
      make: 'Apr 2011',
      color: 'Glossy Red',
      no: '1CUS775',
      servicetime: '3 Hours',
    },
    {
      name: 'Gopal Dobariya',
      time: '12:00 PM',
      car: 'Mitsubishi Lenecer',
      make: 'Apr 2011',
      color: 'Glossy Red',
      no: '1CUS775',
      servicetime: '3 Hours',
    },
    {
      name: 'Vairag Borad',
      time: '12:00 PM',
      car: 'Mitsubishi Lenecer',
      make: 'Apr 2011',
      color: 'Glossy Red',
      no: '1CUS775',
      servicetime: '3 Hours',
    },
  ]);

  const onScrollToIndex = nativeEvent => {
    const newOffset = nativeEvent.contentOffset.y;
    if (newOffset <= 0) return setShowTabBar(true);
    offsetY < newOffset ? setShowTabBar(false) : setShowTabBar(true);
    offsetY = newOffset;
  };

  useEffect(() => {
    setFilteredDataSource(data);
  }, []);

  let d = moment(date).format('DD | MM | yyyy');

  const dialCall = number => {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${number}`;
    } else {
      phoneNumber = `telprompt:${number}`;
    }
    Linking.openURL(phoneNumber);
  };

  const searchFilterFunction = text => {
    if (text) {
      const newData = data.filter(function (item) {
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(data);
      setSearch(text);
    }
  };

  return (
    <BaseScreen
      barStyle={'light-content'}
      translucent={Platform.OS === 'ios' ? true : false}>
      <Header
        icon={true}
        title={common.translate(constant.MyQueue)}
        titLeft={true}
        // whiteNew={true}
        notification={true}
        translate={true}
      />
      <View style={styles.main}>
        <Modal
          animationType="none"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            // Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.modalView}>
            <View style={styles.subView}>
              <Text
                style={{
                  textAlign: 'center',
                  marginTop: 15,
                  fontSize: 17,
                  fontFamily: 'Roboto-Regular',
                  color: color.lightgrey,
                }}>
                {common.translate(constant.mainlbl)}
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  marginVertical: 15,
                  fontSize: 18,
                  fontFamily: 'Roboto-Bold',
                  color: color.blue,
                }}>
                {names}
              </Text>
              <TextInput
                placeholder={common.translate(constant.txtLeave)}
                numberOfLines={10}
                multiline={true}
                style={styles.txtInput}
              />
              <View style={styles.btnView}>
                <TouchableOpacity activeOpacity={0.7} style={styles.btnDrop}>
                  <Text style={styles.btnText}>
                    {common.translate(constant.Drop)}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setModalVisible(!modalVisible)}
                  style={styles.btnCancel}>
                  <Text style={styles.btnText}>
                    {common.translate(constant.Cancel)}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <View style={styles.main1}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.submain1}
            onPress={() => setOpen(true)}>
            <Text style={styles.txtDate}>{d}</Text>
            <View
              // activeOpacity={0.7}
              style={styles.btndate}>
              <AntDesign name="caretdown" size={15} color={color.blue} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} style={styles.btnReq}>
            <Text style={styles.txtReq}>
              {common.translate(constant.stopRequests)}
            </Text>
          </TouchableOpacity>
        </View>
        <DatePicker
          modal
          mode="date"
          open={open}
          style={{backgroundColor: color.white}}
          date={date}
          onConfirm={date => {
            setOpen(false);
            setDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
        <View style={styles.search}>
          <Octicons
            name="search"
            size={20}
            color={color.blue}
            style={{marginLeft: 10}}
          />
          <TextInput
            placeholder={common.translate(constant.search)}
            value={search}
            onChangeText={text => searchFilterFunction(text)}
            onClear={text => searchFilterFunction('')}
            placeholderTextColor={color.lightgrey}
            style={styles.textInput}
          />
        </View>
        {/* <FlatList
          data={filteredDataSource}
          contentContainerStyle={{paddingBottom: 30}}
          keyExtractor={(item, index) => index.toString()}
          scrollEventThrottle={16}
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}
          bounces={false}
          onScroll={({nativeEvent}) => onScrollToIndex(nativeEvent)}
          // renderItem={renderItems}
        /> */}
        <ScrollView
          scrollEventThrottle={16}
          alwaysBounceVertical={false}
          contentContainerStyle={{paddingBottom: 30}}
          showsVerticalScrollIndicator={false}
          bounces={false}
          onScroll={({nativeEvent}) => onScrollToIndex(nativeEvent)}>
          {data.map((item, index) => {
            return (
              <View key={index.toString()} style={styles.main2}>
                <Text style={styles.txtName}>{item.name}</Text>
                <View style={styles.view1}>
                  <Text style={styles.txt}>
                    {common.translate(constant.lblArrivalTime)}:
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      fontFamily: 'Roboto-Bold',
                      letterSpacing: 0.5,
                    }}>
                    {item.time}
                  </Text>
                </View>
                <View style={styles.view2}>
                  <View>
                    <Text style={styles.txt}>
                      {common.translate(constant.Car)}: {item.car}
                    </Text>
                    <Text style={styles.txt}>
                      {common.translate(constant.Make)} : {item.make}
                    </Text>
                    <Text style={styles.txt}>
                      {common.translate(constant.Color)}: {item.color}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.txt}>
                      {common.translate(constant.PlateNo)}: {item.no}
                    </Text>
                    <Text style={styles.txt}>
                      {common.translate(constant.EstServiceTime)}:{' '}
                      {item.servicetime}
                    </Text>
                  </View>
                </View>
                <View style={styles.line} />
                <Text style={styles.txtbook}>
                  {common.translate(constant.ServiceBooked)}
                </Text>
                <View style={styles.view3}>
                  <View style={{width: '50%'}}>
                    <Text style={styles.txt}>
                      {common.translate(constant.Carwash)}
                    </Text>
                  </View>
                  <View style={{width: '50%'}}>
                    <Text style={styles.txt}>
                      {common.translate(constant.CarRepair)}
                    </Text>
                  </View>
                </View>
                <View style={styles.line} />
                <View style={styles.view4}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.btnCall}
                    onPress={() => {
                      dialCall(7990426066);
                    }}>
                    <View style={{height: 15, width: 15}}>
                      <FastImage
                        source={require('../component/image/Path2181.png')}
                        style={styles.logoImg}
                        resizeMode={FastImage.resizeMode.cover}
                      />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                      setModalVisible(true), setnames(item.name);
                    }}
                    style={styles.btnDrops}>
                    <Text
                      style={{
                        color: color.white,
                        fontFamily: 'Roboto-Bold',
                        letterSpacing: 0.5,
                      }}>
                      {common.translate(constant.Drop)}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </BaseScreen>
  );
};

export default inject('userstore')(observer(MyQueue));

const styles = StyleSheet.create({
  datePickerStyle: {
    width: 200,
    // marginTop: 20,
  },
  logoImg: {
    width: '100%',
    height: '100%',
  },
  main: {
    flex: 1,
    backgroundColor: color.white,
  },
  main1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 15,
  },
  submain1: {
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: color.blueLight,
    flexDirection: 'row',
  },
  btnReq: {backgroundColor: color.darkRed, borderRadius: 5},
  btndate: {
    marginRight: 5,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtDate: {marginHorizontal: 10, marginVertical: 5, color: color.black},
  txtReq: {
    color: color.white,
    fontSize: 15,
    fontFamily: 'Roboto-Bold',
    marginHorizontal: 20,
    marginVertical: 5,
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 5,
    paddingVertical: Platform.OS === 'ios' ? 5 : null,
    borderColor: color.lightgrey,
  },
  textInput: {fontSize: 15, marginLeft: 10, color: color.black},
  main2: {
    backgroundColor: color.container,
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 5,
  },
  txtName: {
    marginLeft: 15,
    marginVertical: 10,
    fontSize: 18,
    fontFamily: 'Roboto-Bold',
    letterSpacing: 0.5,
    color: color.black,
  },
  view1: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: color.line,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  txt: {fontSize: 13, fontFamily: 'Roboto-Regular', color: color.black},
  view2: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: 15,
    marginVertical: 15,
  },
  txtbook: {
    fontWeight: '700',
    marginLeft: 15,
    marginTop: 10,
    color: color.black,
  },
  view3: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
    marginTop: 5,
    marginBottom: 10,
    fontFamily: 'Roboto-Bold',
    letterSpacing: 0.5,
  },
  line: {marginLeft: 15, borderWidth: 1, borderColor: color.line},
  view4: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: 15,
  },
  btnCall: {
    margin: 10,
    padding: 10,
    borderRadius: 3,
    backgroundColor: '#36BF5B',
  },
  btnDrops: {
    paddingVertical: 7,
    borderRadius: 3,
    paddingHorizontal: 30,
    backgroundColor: color.darkBlue,
  },
  modalView: {
    flex: 1,
    backgroundColor: 'rgba(85, 99, 124,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subView: {
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
  txtInput: {
    height: hp(20),
    width: wp(83),
    borderWidth: 1,
    alignSelf: 'center',
    marginHorizontal: 15,
    borderColor: color.line,
    textAlignVertical: 'top',
    paddingLeft: 10,
    fontFamily: 'Roboto-Regular',
  },
  btnView: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: 20,
  },
  btnDrop: {
    borderRadius: 3,
    backgroundColor: color.darkBlue,
    marginLeft: 20,
  },
  btnCancel: {
    borderRadius: 3,
    backgroundColor: color.darkRed,
    marginRight: 20,
  },
  btnText: {
    color: color.white,
    paddingVertical: 10,
    paddingHorizontal: 50,
    fontFamily: 'Roboto-Bold',
    letterSpacing: 0.5,
  },
});
