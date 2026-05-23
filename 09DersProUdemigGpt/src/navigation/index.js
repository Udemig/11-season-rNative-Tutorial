import {Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import HomeScreen from '../screens/HomeScreen'
import WelcomeScreen from '../screens/WelcomeScreen'


const Stack = createNativeStackNavigator()

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='Home'> 
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='Welcome' component={WelcomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigation

