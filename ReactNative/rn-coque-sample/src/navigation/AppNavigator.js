import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LanguageSelectScreen from '../screens/LanguageSelectScreen';
import WorldListScreen from '../screens/WorldListScreen';
import StageListScreen from '../screens/StageListScreen';
import LearningScreen from '../screens/LearningScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen
          name="LanguageSelect"
          component={LanguageSelectScreen}
          options={{ title: '언어 선택' }}
        />
        <Stack.Screen
          name="WorldList"
          component={WorldListScreen}
          options={{ title: '월드 선택' }}
        />
        <Stack.Screen
          name="StageList"
          component={StageListScreen}
          options={{ title: '스테이지 선택' }}
        />
        <Stack.Screen
          name="Learning"
          component={LearningScreen}
          options={{ title: '학습하기' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
