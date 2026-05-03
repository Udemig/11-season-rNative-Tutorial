import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AnasayfaEkran from './ekranlar/AnasayfaEkran';
import HakkimizdaEkran from './ekranlar/HakkimizdaEkran';


const Stack = createStackNavigator()

export const AppStack = () =>{
  return <Stack.Navigator initialRouteName='Anasayfa' screenOptions={{
        headerStyle:{
            backgroundColor: "#6a51ae"
          },
          headerTintColor: "#fff",
          headerTitleStyle:{fontWeight: "bold"},
      }}>

        <Stack.Screen 
        name="Anasayfa" 
        component={AnasayfaEkran}
        options={{
          title: "Anasayfaya Hosgeldin",
         
          headerRight: () => (
            <Pressable onPress={ ()=>alert("tikladin") }>
              <Text style={{color: "#fff", fontSize: 16}}>Menu</Text>
            </Pressable>
          ),
          
        }}
        />

        <Stack.Screen 
        name='Hakkimizda' 
        component={HakkimizdaEkran}
        initialParams={{
          ad: "Misafir"
        }}
        options={({ route }) => ({
          title: route.params.ad
        })}
         />

      </Stack.Navigator>
}

export default function App() {
  return (
    <NavigationContainer>
        <AppStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
