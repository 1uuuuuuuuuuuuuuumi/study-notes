// 앱의 시작점

// src/App.js

/**
 * 이 파일은 앱의 시작점 !
 * React Native 앱이 실행되면 가장 먼저 이 파일이 실행된다.
 */

import React from "react";
import HomeScreen from "./screens/HomeScreen";

/**
 * App 컴포넌트
 * 앱의 최상위 컴포넌트.
 * 현재는 HomeScreen만 표시하지만, 나중에 네비게이션을 추가하면
 * 여러 화면 사이를 이동할 수 있게 된다.
 */
const App = () => {
  return <HomeScreen />;
};

export default App;