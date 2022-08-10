import {useTranslation} from 'react-i18next';
import {Alert, Platform, ToastAndroid} from 'react-native';

// const {t, i18n} = useTranslation();

// const changeLanguages = item => {
//   i18n.changeLanguage(item);
// };

const translate = item => {
  const {t, i18n} = useTranslation();
  const name = t(item);
  return name;
};

const showMessage = message => {
  Platform.OS == 'android'
    ? ToastAndroid.show(message, ToastAndroid.LONG)
    : Alert.alert(message);
};

export default {
  showMessage,
  // changeLanguages,
  translate,
};
