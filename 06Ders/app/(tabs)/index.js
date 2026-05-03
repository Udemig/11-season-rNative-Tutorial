import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import AnasayfaEkran from './ekranlar/AnasayfaEkran';



const Stack = createStackNavigator()

export default function HomeScreen() {
  return (
    <AnasayfaEkran />
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
