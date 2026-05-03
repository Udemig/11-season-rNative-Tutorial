import { StyleSheet, Text, View } from 'react-native'

const AnasayfaEkran = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>AnasayfaEkran</Text>
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