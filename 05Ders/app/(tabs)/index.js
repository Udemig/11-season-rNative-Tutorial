import { useState } from 'react';
import { Button, Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from 'react-native';


export default function HomeScreen() {

  const [kadi, setKadi] = useState("")
  const [sifre, setSifre] = useState("")

  const [hatalar, setHatalar] = useState({})

  const validateForm = () =>{
    let hatalar = {}

    if (!kadi) hatalar.kadi = "kullanici adi zorunlu"
    if (!sifre) hatalar.sifre = "sifre  zorunlu"

    setHatalar(hatalar)

    return Object.keys(hatalar).length === 0
  }

  const formuEleAl = () =>{

    if (validateForm()){
      console.log("giris basarili", kadi, sifre)
      setKadi("")
      setSifre("")
      setHatalar({})
    } 
  }



  return (
    <KeyboardAvoidingView 
    style={styles.container} 
    behavior='padding'
    keyboardVerticalOffset={Platform.OS === "ios" ? 100: 0}
    >
      <View style={styles.form}>
        <Image source={require("../../assets/images/icon.png")} style={styles.image}/>
        <Text style={styles.label}>Kullanidi Adi</Text>
        <TextInput 
        value={kadi}
        placeholder='kullanici adi gir' 
        style={styles.input}
        onChangeText={setKadi}
          />
          {
            hatalar.kadi ? (
              <Text style={styles.errorText}>{hatalar.kadi} </Text>
            ) : null
          }
        <Text style={styles.label}>Sifre</Text>
        <TextInput 
        placeholder='sifre gir' 
        secureTextEntry  
        value={sifre}
        style={styles.input} 
        onChangeText={setSifre} 
        />
          {
            hatalar.sifre ? 
            (
              <Text style={styles.errorText}>{hatalar.sifre} </Text>
            ) : null
          }
        <Button  title='Giris yap' onPress={formuEleAl} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#f5f5f5"
  },
  form:{
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold"
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    borderRadius: 5
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginBottom: 50
  },
  errorText:{
    color:"red",
    marginBottom: 10
  }
});
