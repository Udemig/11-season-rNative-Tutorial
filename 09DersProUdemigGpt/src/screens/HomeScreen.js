import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Alert } from 'react-native'
import React, { use, useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { dummyMesajlar } from "../constants";
import Features from "../components/features";
import Voice from '@react-native-community/voice';
import { apiCall } from "../api/opneAI";
import Tts from 'react-native-tts';

const HomeScreen = () => {

  const [messages, setMessages] = useState(dummyMesajlar)
  const [loading, setLoading] = useState(false)
  const [recording, setRecording] = useState(false)
  const [speaking, setSpeaking] = useState(false)
  const [result, setResult] = useState("")
  const ScrollViewRef = useRef()


  const startTextToSpeech = message => {
    if (!message?.content) {
      return
    }

    if (!message.content.includes("https") && !message.content.includes("data:image/png;base64")) {
      setSpeaking(true)
      Tts.speak(message.content, {
          iosVoiceId: 'com.apple.ttsbundle.Moira-compact',
          rate: 0.5,
      })
    }
  }

  const startRecording = async () => {

    try {

      setRecording(true)
      setSpeaking(true)

      await Voice.start("tr-TR")
    } catch (error) {
      console.log(error)
      setRecording(false)
    }
  }

  const stopRecording = async () => {
    try {
      await Voice.stop()
      setRecording(false)
      setSpeaking(false)

      fetchResponse()

      //veriyi cek az sonra
    } catch (error) {
      console.log(error)
      setRecording(false)
      setSpeaking(false)
    }
  }

  const fetchResponse = () => {
    if (result.trim().length > 0) {
      let newMessages = [...messages]
      newMessages.push({ role: "user", content: result.trim() })
      setMessages([...newMessages])

      updateScrollView()
      setLoading(true)

      apiCall(result.trim(), newMessages).then(res => {
        console.log("api verisi; ", res)
        setLoading(false)
        if (res.success) {
          setMessages([...res.data])
          updateScrollView()
          setResult('')
          //speech yapacagiz
          startTextToSpeech(res.data[res.data.length - 1])
        } else {
          Alert.alert("Hata", res.msg)
        }
      })

    }
  }

  const updateScrollView = () => {
    setTimeout(() => {
      ScrollViewRef?.current?.scrollToEnd({ animated: true })
    }, 1000)
  }

  const speechStartHandler = e => {
    console.log("speechStartHandler")
  }
  const speechEndHandler = e => {
    setRecording(false)
    console.log("speechEndHandler")
  }
  const speechResultsHandler = e => {
    const text = e.value[0]
    console.log(text)
    //veriyi ata az sonra
    setResult(text)
    console.log("speechResultsHandler")
  }

  const speechErrorHandler = e => {
    console.log("speechErrorHandler")
  }

  useEffect(() => {
    Voice.onSpeechStart = speechStartHandler;
    Voice.onSpeechEnd = speechEndHandler;
    Voice.onSpeechResults = speechResultsHandler;
    Voice.onSpeechError = speechErrorHandler;


    Tts.addEventListener('tts-start', (event) => console.log("start", event));
    Tts.addEventListener('tts-progress', (event) => console.log("progress", event));
    Tts.addEventListener('tts-finish', (event) => {
      console.log("finished", event)
      setSpeaking(false)
    });
    Tts.addEventListener('tts-cancel', (event) => console.log("cancel", event));

    return () => {
      Voice.destroy().then(Voice.removeAllListeners)
    }

  }, [])

  const clear = () => {
    setMessages([])
    Tts.stop()
  }

  return (
    <View className='flex-1 bg-white'>
      <SafeAreaView className='flex-1 flex mx-5'>
        {/* bot resmi*/}
        <View className='flex-row justify-center'>
          <Image source={require("../../assets/images/bot.png")} style={{ height: hp(15), width: hp(15) }} />
        </View>
        {/* mesajlar */}
        {
          messages.length > 0 ? (
            <View className='space-y-2 flex'>
              <Text style={{ fontSize: wp(5) }} className='text-gray-700 font-semibold ml-1'>
                Asistan
              </Text>
              <View style={{ height: hp(58) }} className='bg-neutral-200 rounded-3xl p-4'>

                <ScrollView
                  ref={ScrollViewRef}
                  bounces={false}
                  showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: hp(2) }}>
                  {
                    messages.map((message, index) => {
                      if (message.role == "assistant") {
                        if (message.content.includes("https") || message.content.includes("data:image/png;base64")) {
                          //ai resmi
                          return (
                            <View key={index} className='flex-row justify-start'>
                              <View className='p-2 flex rounded-2xl bg-emerald-500 rounded-tl-none'>
                                <Image source={{ uri: message.content }} className='rounded-2xl' resizeMode='contain'
                                  style={{ height: wp(60), width: wp(60) }} />
                              </View>
                            </View>
                          )
                        } else {
                          //yazi
                          return (
                            <View key={index} style={{ width: wp(70) }}
                              className='bg-emerald-100 rounded-xl p-2 rounded-tl-none'>
                              <Text>{message.content}</Text>
                            </View>
                          )

                        }
                      } else {
                        //kullanici verisi
                        return (
                          <View key={index} className='flex-row justify-end'>
                            <View style={{ width: wp(70) }} className='bg-white rounded-xl p-2 rounded-tr-none'>
                              <Text>{message.content}</Text>
                            </View>
                          </View>
                        )
                      }
                    })
                  }
                </ScrollView>

              </View>
            </View>
          ) : (
            <Features />
          )
        }
        {/* kayit */}
        <View className='flex justify-center items-center'>
          {
            loading ? (
              <Image
                source={require("../../assets/images/loading.png")}
                style={{ width: hp(10), height: hp(10) }}
              />
            ) :
              recording ? (
                <TouchableOpacity onPress={stopRecording}>
                  <Image
                    className='rounded-full'
                    source={require('../../assets/images/voiceloadingicon.png')}
                    style={{ width: hp(10), height: hp(10) }}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={startRecording}>
                  <Image
                    className='rounded-full'
                    source={require('../../assets/images/recordingicon.png')}
                    style={{ width: hp(10), height: hp(10) }}
                  />
                </TouchableOpacity>
              )
          }
          {
            messages.length > 0 && (
              <TouchableOpacity
                onPress={clear}
                className='bg-neutral-400 rounded-3xl p-2 absolute right-10'
              >
                <Text className='text-white font-semibold'> Temizle </Text>
              </TouchableOpacity>
            )
          }
          {
            speaking && (
              <TouchableOpacity
                onPress={stopRecording}
                className='bg-red-400 rounded-3xl p-2 absolute left-10'
              >
                <Text className='text-white font-semibold'> Durdur </Text>
              </TouchableOpacity>
            )

          }

        </View>

      </SafeAreaView>
    </View>
  )
}

export default HomeScreen
