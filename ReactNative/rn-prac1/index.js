import { AppRegistry } from "react-native";
import App from './src/App'; // src 폴더의 App.js를 가져옴
import { name as appName } from './app.json';

// 앱을 등록한다.
// React Native가 이 부분을 보고 앱을 실행한다.
AppRegistry.registerComponent(appName, () => App);