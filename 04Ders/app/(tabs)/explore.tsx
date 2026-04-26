import { FlatList, Platform, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

import meyveListesi from "../../data.json";

export default function TabTwoScreen() {
  return (
    <SafeAreaView style={styles.headerImage}>
        <View>
                        <Text style={styles.titleContainer}> Explore</Text>

         


              <FlatList 
                data={meyveListesi}
                renderItem={({ item })=>{
                  console.log(item.id)
                  return (
                    <View style={{backgroundColor: "purple", padding: 5, margin: 5, borderRadius: 8, borderWidth: 1}} key={item.id}>
                        <Text style={styles.titleContainer}>{item.adi} ve</Text>
                        <Text style={styles.altBaslik}>{item.tip}</Text>
                   </View>
                  )
                }}
                keyExtractor={(item)=>item.id.toString()}
                ItemSeparatorComponent={<View style={{height: 16}} />}
                ListEmptyComponent={<Text> Elemanlar bulunamadi</Text>}
                ListHeaderComponent={<Text style={{color:"white"}}>Meyveler Diziliyor</Text>}
                ListFooterComponent={<Text style={{color:"white"}}>Meyveler Bitti</Text>}
              
              />



        </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    backgroundColor: Platform.OS === "android" ? "red" : "blue",
    paddingTop: StatusBar.currentHeight
  },
  titleContainer: {
    ...Platform.select({
      ios: {
        color: "purple",
        fontSize: 24,
        fontStyle: "italic",
        backgroundColor: "yellow",
        padding: 2,
        margin: 2
      },
      android: {
        color: "red",
        fontSize: 25,
      }
    })
  },
  altBaslik:{
    backgroundColor: "red",
    color: "white",
    padding: 2,
    margin: 2,
    fontSize: 14
  }
});
