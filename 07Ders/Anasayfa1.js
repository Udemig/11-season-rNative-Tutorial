import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import UcuncuEkran from './ekranlar/UcuncuEkran'
import DorduncuEkran from './ekranlar/DorduncuEkran'
import BesinciEkran from './ekranlar/BesinciEkran'
import Ionicons from '@react-native-vector-icons/ionicons'
import { AppStack } from './App'



const Tab = createBottomTabNavigator()

const Anasayfa1 = () => {
  return (
      <NavigationContainer>
        <Tab.Navigator screenOptions={{
            tabBarLabelPosition: "below-icon",
            tabBarShowLabel: true,
            tabBarActiveTintColor: "purple"
        }}>
            <Tab.Screen name='Ekran3' component={UcuncuEkran}
                options={{
                    tabBarLabel: "Profil",
                    tabBarIcon: ({color}) =>(
                        <Ionicons name='person' size={20} color={color} />
                    ),
                    tabBarBadge: 3
                }}
            />
            <Tab.Screen name='Ekran4' component={DorduncuEkran}/>
            <Tab.Screen name='Ekran5' component={BesinciEkran}/>
            <Tab.Screen name='Ekran6' component={AppStack}
            options={{
                headerShown: false
            }}/>
        </Tab.Navigator>
      </NavigationContainer>

  )
}

export default Anasayfa1

const styles = StyleSheet.create({})