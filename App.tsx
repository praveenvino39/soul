/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type { PropsWithChildren } from 'react';

import OnboardScreen from './src/screens/OnboardScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateWalletScreen from './src/screens/CreateWalletScreen';
import LoginWalletScreen from './src/screens/LoginWalletScreen';


const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Onboard' screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Onboard" component={OnboardScreen} />
          <Stack.Screen name="CreateWalletScreen" component={CreateWalletScreen} />
          <Stack.Screen name="LoginWalletScreen" component={LoginWalletScreen} />


        </Stack.Navigator>
      </NavigationContainer>
    </>

  );
}


export default App;
