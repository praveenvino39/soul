/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import type { PropsWithChildren } from 'react';

import OnboardScreen from './src/screens/OnboardScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateWalletScreen from './src/screens/CreateWalletScreen';
import LoginWalletScreen from './src/screens/LoginWalletScreen';
import { EvmWalletContext } from './src/context/EvmWalletContext';
import EVMWalletHomeScreen from './src/screens/EVMWalletHomeScreen';
import { ethers } from 'ethers'


const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  const [wallet, setWallet] = useState<ethers.Wallet | undefined>()
  return (
    <>
      <EvmWalletContext.Provider value={{ wallet, setWallet }}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Onboard' screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Onboard" component={OnboardScreen} />
            <Stack.Screen name="CreateWalletScreen" component={CreateWalletScreen} />
            <Stack.Screen name="LoginWalletScreen" component={LoginWalletScreen} />
            <Stack.Screen name="EVMWalletHomeScreen" component={EVMWalletHomeScreen} />

          </Stack.Navigator>
        </NavigationContainer>
      </EvmWalletContext.Provider>
    </>

  );
}


export default App;
