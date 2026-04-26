import { Dimensions, StyleSheet, Text, useWindowDimensions, View } from "react-native";

export default function Selamla({isim}){

    const windowWidthh = useWindowDimensions().width
    const windowHeightt = useWindowDimensions().height 

    console.log({windowWidthh, windowHeightt})


    return(
        <View style={{backgroundColor: "red", color:"white", padding:20, margin: 20}}>
            <Text style={styles.text}>Merhaba, {isim}</Text>
        </View>
    )
}

const windowWidth = Dimensions.get("window").width
const windowHeight = Dimensions.get("window").height


console.log({windowWidth, windowHeight})

const styles = StyleSheet.create({
    text: {
        color:"blue", 
        backgroundColor: "yellow", 
        padding:"5%",
        fontSize: windowWidth > 500 ? 50 : 21
    }
})

