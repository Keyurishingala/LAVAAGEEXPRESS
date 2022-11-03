/**
 * @format
 */

import {Alert, AppRegistry, LogBox} from 'react-native';
import App from './App';
import 'react-native-gesture-handler';
import i18n from './lang/i18n';

import {name as appName} from './app.json';

// LogBox.ignoreAllLogs();

AppRegistry.registerComponent(appName, () => App);
