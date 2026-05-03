import { useLayoutEffect } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'


const HakkimizdaEkran = ({route, navigation}) => {
  const {ad} = route.params

  useLayoutEffect(()=>{
    navigation.setOptions({
      title: ad
    })
  },[navigation, ad])

  return (
    <View style={styles.container}>
      <Text style={styles.text}>HakkimizdaEkran {ad}</Text>
      <Button title='Adi guncelle' onPress={()=>navigation.setParams({
        ad: "Udemig"
      })}/>
      <Button title='Veri ile Geri git' onPress={()=>navigation.navigate("Anasayfa",{
        sonuc: "Hakkimizdan gelen veri"
      })} />
    </View>
  )
}

export default HakkimizdaEkran

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