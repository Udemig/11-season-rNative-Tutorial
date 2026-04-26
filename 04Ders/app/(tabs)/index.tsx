import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  Image,
  Modal,
  Pressable,
  SectionList,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

import Selamla from "../../components/Selamla";
import grupBilgiListesi from "../../grup-veri.json";

const logoImg = require("../../assets/images/icon.png");

export default function HomeScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="red" barStyle="light-content" />

      <SectionList
        sections={grupBilgiListesi}
        keyExtractor={(item, index) => item + index}
        ListHeaderComponent={
          <View style={styles.headerContent}>
            <Selamla isim="ekrem dogancay" />
            <Selamla isim="omer altun" />
            <Selamla isim="esra canturk" />

            <ActivityIndicator size="large" color="blue" animating={false} />

            <Pressable onPress={() => setIsModalVisible(true)}>
              <Text style={styles.yazi}>Merhaba Memo</Text>
            </Pressable>

            <Button
              title="Bana tikla"
              onPress={() => console.log("Buttona tikladin")}
              color="red"
            />

            <Pressable
              onPress={() =>
                Alert.alert("gecersiz veri", "veri yanlis alindi", [
                  {
                    text: "Iptal",
                    onPress: () => console.log("iptal tiklandi"),
                  },
                  {
                    text: "Tamam",
                    onPress: () => console.log("tamam tiklandi"),
                  },
                ])
              }
            >
              <Image source={logoImg} style={styles.resim} />
            </Pressable>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item}</Text>
          </View>
        )}
        renderSectionHeader={({ section }) => (
          <Text style={styles.sectionHeader}>{section.tip}</Text>
        )}
      />

      <Modal
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
        animationType="fade"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <Text>Bu bir modal</Text>
          <Button
            title="kapat"
            color="blue"
            onPress={() => setIsModalVisible(false)}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "green",
  },

  headerContent: {
    alignItems: "center",
    padding: 20,
    gap: 10,
  },

  yazi: {
    backgroundColor: "red",
    color: "white",
    padding: 10,
    borderRadius: 8,
  },

  resim: {
    width: 100,
    height: 100,
  },

  sectionHeader: {
    backgroundColor: "darkgreen",
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    padding: 10,
  },

  item: {
    backgroundColor: "white",
    padding: 12,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 8,
  },

  itemText: {
    fontSize: 18,
  },

  modalContainer: {
    flex: 1,
    backgroundColor: "yellow",
    padding: 60,
  },
});