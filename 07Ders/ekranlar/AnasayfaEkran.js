import { useNavigation } from '@react-navigation/native'
import { StyleSheet, Text, View, Button } from 'react-native'

const AnasayfaEkran = ({navigation, route}) => {
    // const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <Text style={styles.text}>AnasayfaEkran</Text>
      <Text style={styles.text}>{route.params?.sonuc}</Text>
      <Button 
      title='Hakkimizda ya git' 
      onPress={()=>
      navigation.navigate("Hakkimizda",{
        ad: "memocan",
      }
      )
    }
      />
    </View>
  )
}

export default AnasayfaEkran

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16
    }

})