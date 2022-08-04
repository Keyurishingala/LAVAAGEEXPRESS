import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import RNMapView, {Circle, Marker} from 'react-native-maps';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import color from './color';

const MapView = ({coords, onPress}) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!!coords && mapRef.current) {
      mapRef.current.animateCamera({
        center: {
          latitude: coords.latitude,
          longitude: coords.longitude,
        },
        pitch: 0,
        heading: 0,
        altitude: 1000,
        zoom: 16,
      });
    }
  }, [coords]);

  return (
    <>
      <RNMapView
        ref={mapRef}
        initialCamera={{
          altitude: 15000,
          center: {
            latitude: 23.7603,
            longitude: 90.4125,
          },
          heading: 0,
          pitch: 0,
          zoom: 11,
        }}
        loadingEnabled
        loadingBackgroundColor="white"
        style={{height: hp(25), width: wp(100)}}
        rotateEnabled={false}>
        {!!coords && (
          <>
            <Marker
              anchor={{x: 0.5, y: 0.6}}
              coordinate={{
                latitude: coords.latitude,
                longitude: coords.longitude,
              }}
              flat
              style={{
                ...(coords.heading !== -1 && {
                  transform: [
                    {
                      rotate: `${coords.heading}deg`,
                    },
                  ],
                }),
              }}>
              <View style={styles.dotContainer}>
                <View style={[styles.arrow]} />
                <View style={styles.dot} />
              </View>
            </Marker>
            <Circle
              center={{
                latitude: coords.latitude,
                longitude: coords.longitude,
              }}
              radius={coords.accuracy}
              strokeColor="rgba(0, 150, 255, 0.5)"
              fillColor="rgba(0, 150, 255, 0.5)"
            />
          </>
        )}
      </RNMapView>
      {/* <TouchableOpacity
        onPress={onPress}
        style={{
          position: 'absolute',
          // backgroundColor: 'red',
          width: wp(85),
          // height: hp(25),

          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          // overflow: 'hidden',
        }}>
        <MaterialCommunityIcons
          name="crosshairs-gps"
          size={30}
          color={color.black}
          style={{marginRight: 10, marginBottom: 10}}
        />
      </TouchableOpacity> */}
    </>
  );
};

export default MapView;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  dotContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    backgroundColor: 'rgb(0, 120, 255)',
    width: 24,
    height: 24,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 12,
    shadowColor: 'black',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 1.5,
    elevation: 4,
  },
  arrow: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderBottomWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'rgb(0, 120, 255)',
  },
});
