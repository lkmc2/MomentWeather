import { AppRegistry } from 'react-native';
import App from './App';

global.__APP__=true;
global.__ANDROID__=true;
global.__IOS__=false;

AppRegistry.registerComponent('MomentWeather', () => App);
