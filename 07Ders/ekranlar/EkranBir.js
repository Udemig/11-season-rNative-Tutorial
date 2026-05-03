import { StyleSheet, Text, View, Button} from 'react-native'
import React from 'react'

const EkranBir = ({navigation}) => {
  return (
    <View>
      <Text>EkranBir</Text>
      <Button title='Ac Kapa' onPress={()=> navigation.toggleDrawer()}/>
      <Button title='Ekran 2 ye git' onPress={()=> navigation.jumpTo("EkranIkiAd")}/>

    </View>
  )
}

export default EkranBir

const styles = StyleSheet.create({})