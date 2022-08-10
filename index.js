/**
 * @format
 */

import {Alert, AppRegistry} from 'react-native';
import App from './App';
import 'react-native-gesture-handler';
import i18n from './lang/i18n';

import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
