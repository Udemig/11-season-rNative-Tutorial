import { StyleSheet, Text, View } from 'react-native'

const HakkimizdaEkran = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>HakkimizdaEkran</Text>
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