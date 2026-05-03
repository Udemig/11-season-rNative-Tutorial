import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import EkranBir from "./ekranlar/EkranBir"
import EkranIki from "./ekranlar/EkranIki"



const Drawer = createDrawerNavigator()

const YeniSayfa = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen 
        name='EkranBirAd' 
        component={EkranBir}
        options={{
            title: "Ben Birinci ekranim",
            drawerLabel: "Birinci ekran drawer",
            drawerActiveBackgroundColor: "lightblue",
            drawerContentStyle:{
              backgroundColor: "#c6cbef"
            }
          } 
        }
         />
        <Drawer.Screen name='EkranIkiAd' component={EkranIki} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

export default YeniSayfa

const styles = StyleSheet.create({})