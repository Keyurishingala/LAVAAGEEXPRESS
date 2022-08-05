import {View, Text, StyleSheet, TouchableOpacity, Animated} from 'react-native';
import React, {useEffect, useState} from 'react';

const demo = () => {
  const [visible, setVisible] = useState(false);

  const animation = new Animated.Value(0);
  const inputRange = [0, 1];
  const outputRange = [1, 0.8];
  const scale = animation.interpolate({inputRange, outputRange});

  useEffect(() => {
    Animated.spring(animation, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  const onPressIn = () => {};

  return (
    <View style={styles.container}>
      {visible === true && (
        <Animated.View style={[styles.button, {transform: [{scale}]}]}>
          <Text style={styles.btnText}>BUTTON</Text>
        </Animated.View>
      )}
      <TouchableOpacity onPress={() => setVisible(!visible)}>
        <Text>Click Me</Text>
      </TouchableOpacity>
    </View>
  );
};

export default demo;

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  button: {
    height: 70,
    width: 200,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    marginBottom: 20,
    borderRadius: 10,
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 25,
  },
});
