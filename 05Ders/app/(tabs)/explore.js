import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StatusBar, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/* 
Bir kullanici giris formu yapini ve ekranin ortasina ortalansin
kulalnici adi ve sifre yazacak kisi ve giris butonu olacak.
B
*/
export default function TabTwoScreen() {

  const [ad,setAd] = useState("")
  const [siyadMod,setSiyahMode] = useState(false)

  const [postListesi, setPostListesi] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  /* 
  Internete istek atip verileri alip onlari guzel bir gornumle flatlist ile
  ekranda listeleyiniz
  
  */

  const veriAl = async (limit = 10) => {
     await new Promise(resolve => setTimeout(resolve, 2000))

    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=${limit}`
    )
    const data = await response.json()
    console.log("veri al calisti", data)
    setPostListesi(data)
     setIsLoading(false )
  }

  useEffect(()=>{
    veriAl()
  },[])

  if (isLoading) {
    return(
      <SafeAreaView style={styles.loadingContainer}>
          <ActivityIndicator size="large"  color="#0000ff"/>
          <Text>Yukeniyor...</Text>
      </SafeAreaView>
    )
  }


  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Kullanici Adi:</Text>
        <TextInput 
        style={styles.custumField} 
        value={ad} 
        onChangeText={setAd} 
        placeholder='adini gir'
        keyboardType='numeric'
        autoCorrect={false}
        autoCapitalize='none'
        multiline
        />
        <Text>Merhaba benim adim: {ad}</Text>
        <View style={styles.custumField}>
          <Text>HAngi mod ile kullanmak istiyorsun?</Text>
          <Switch 
          value={siyadMod}
          onValueChange={()=>setSiyahMode((previousState)=>!previousState)}
          trackColor={{false: "#345267", true: "#972364"}}
          thumbColor="#536814"
          />
        </View>
      </View>

        <View style={styles.listContainer}>
          <FlatList 
          data={postListesi}
          renderItem={({item}) =>{
            return (
              <View style={styles.card}> 
                <Text style={styles.titleText}>{item.title}</Text>
                <Text  style={styles.bodyText}>{item.body}</Text>
              </View>
            )
          }}
          ItemSeparatorComponent={()=>(
            <View 
              style={{height: 16,}}
            />
          )}
          ListEmptyComponent={<Text>Liste bulunamadi</Text>}
          ListHeaderComponent={<Text style={styles.headerText}> Listemiz </Text>}
          ListFooterComponent={
            <Text style={styles.footerText}> Liste Sonu</Text>
          }
          
          />
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  container:{
    backgroundColor: "#3ee",
    flex: 1,
    paddingTop: StatusBar.currentHeight
  },
  custumField:{
    backgroundColor: "rgb(184, 212, 25)",
    padding: 10,
    margin: 10
  },

  listContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  card:{
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    borderWidth: 1
  },
  titleText:{
    fontSize: 30
  },
  bodyText:{
    fontSize: 24,
    color: "#666666"
  },
  headerText: {
    fontSize: 30,
    color: "red"
  },
  footerText: {
    fontSize: 30,
    color: "#462842"
  },
  loadingContainer:{
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingTop: StatusBar.currentHeight,
    justifyContent: "center",
    alignItems: "center"
  }
});
