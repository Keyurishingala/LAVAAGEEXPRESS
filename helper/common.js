import {Alert, Platform, ToastAndroid} from 'react-native';

const showMessage = message => {
  Platform.OS == 'android'
    ? ToastAndroid.show(message, ToastAndroid.LONG)
    : Alert.alert(message);
};

export default {
  showMessage,
};
