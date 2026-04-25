import { Button, Image, ImageBackground, StyleSheet, Text, View } from "react-native";


const logoImg = require("../../assets/images/icon.png")

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.nameContainer}>Memo</Text>
      <Image source={logoImg} style={styles.img}/>
      <Image 
      source={{uri: 'https://picsum.photos/id/237/100/100'}}
      style= {{width: 100, height: 150}} />
     
      <ImageBackground source={logoImg}>
        <Text style={{width: 200, height: 200}}>Numan Balik</Text>
      </ImageBackground>

     <Button title="Kayit ol" onPress={()=>console.log("bana tikladi")}/>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  nameContainer:  {
    backgroundColor: "blue",
    color: "white",
    height: 100,
    width: 100
  },
  img:{
    width: 100,
    height: 100
  }
})

