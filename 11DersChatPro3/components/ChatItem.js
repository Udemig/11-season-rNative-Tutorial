import { Image } from 'expo-image';
import { collection, doc, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { db } from "../firebaseConfig";
import { blurhash, formatDate, getRoomId } from '../utils/common';

const ChatItem = ({ item, router, noBorder, currentUser }) => {

  const [lastMessage, setLastMessage] = useState([])

  const openChatRoom = () => {
    router.push({pathname: "/chatRoom", params: item})
  }

  const renderTime = () =>{
    if (lastMessage){
      let date = lastMessage?.createdAt
      console.log("zamanaa ", date)
      return formatDate(date)
    }
  }

  useEffect(()=>{

    let roomId = getRoomId(currentUser?.userId, item?.userId)
    const docRef = doc(db, "rooms", roomId)
    const messageRef = collection(docRef, "messages")
    const q = query(messageRef, orderBy("createdAt","desc"))

      

  },[])

  return (
    <TouchableOpacity
      style={{ marginHorizontal: 10 }}
      onPress={openChatRoom}
      style={{
        marginHorizontal: 10,
        borderBottomWidth: noBorder ? 0 : StyleSheet.hairlineWidth,
        borderBottomColor: '#d4d4d4',
        
      }}
      className="flex-row items-center gap-3"    >
      <Image
        source={{ uri: item?.profileUrl }}
        style={{
          height: hp(6),
          width: hp(6),
          borderRadius: hp(3),
          overflow: "hidden",
          marginVertical: 5
        }}
        placeholder={{ blurhash }}
      />

      {/* zaman ve son mesaj */}
      <View className="flex-1" style={{ marginLeft: 10 }}>
        <View
          className="flex-row justify-between items-center"
          style={{ marginBottom: 8 }}
        >
          <Text
            style={{ fontSize: hp(1.8) }}
            className="font-semibold text-neutral-800"
          >
            {item?.username}
          </Text>

          <Text
            style={{ fontSize: hp(1.6) }}
            className="font-medium text-neutral-500"
          >
            az once
          </Text>
        </View>

        <Text
          style={{ fontSize: hp(1.6), lineHeight: hp(2.2) }}
          className="font-medium text-neutral-500"
        >
          son mesaj
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default ChatItem

const styles = StyleSheet.create({})