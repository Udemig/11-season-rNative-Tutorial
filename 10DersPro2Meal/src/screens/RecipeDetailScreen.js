import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CachedImage } from '../helpers'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { ChevronLeftIcon, ClockIcon, FireIcon, HeartIcon, Square3Stack3DIcon, UsersIcon } from 'react-native-heroicons/outline';
import { useNavigation } from "@react-navigation/native";
import Loading from '../components/loading';
import axios from 'axios';
import YoutubeIframe from 'react-native-youtube-iframe';


const RecipeDetailScreen = (props) => {

  let item = props.route.params
  const navigation = useNavigation()
  const [isFavorite, setIsFavorite] = useState(false)
  const [loading, setLoading] = useState(true)
  const [meal, setMeal] = useState(null)

  useEffect(() => {
    getMealData(item.idMeal)
  }, [])

  const getMealData = async (id) => {
    try {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      console.log("yemek detayi ", response.data)
      if (response && response.data) {
        setMeal(response.data.meals[0])
        setLoading(false)
      }
    } catch (error) {
      console.log("yemek detayi hatasi", error.message)
    }
  }

  const ingredientsIndexes = (meal) => {
    if (!meal) return []
    let indexes = []
    for (let index = 1; index < 20; index++) {
      if (meal["strIngredient" + index]) {
        indexes.push(index)
      }
    }

    return indexes
  }

  const getYoutubeVideoId = url => {
    const regex = /[?&]v=([^&]+)/;
    const match = url.match(regex)
    if (match && match[1]) {
      return match[1]
    }
    return null
  }

  return (
    <ScrollView
      className="bg-white flex-1"
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      <StatusBar barStyle="light-content" />
      <View className="flex-row justify-center">
        <CachedImage
          uri={item.strMealThumb}
          sharedTransitionTag={item.strMeal}
          style={{ width: wp(98), height: hp(50), borderRadius: 53, borderBottomRightRadius: 40, borderBottomLeftRadius: 40, marginTop: 4 }}
        />
      </View>

      {/* Geri buton*/}
      <Animated.View entering={FadeIn.delay(200).duration(1000)} className="w-full absolute flex-row justify-between items-center pt-14">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 rounded-full ml-5 bg-white">
          <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#fbbf24" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)} className="p-2 rounded-full mr-5 bg-white">
          <HeartIcon size={hp(3.5)} strokeWidth={4.5} color={isFavorite ? "red" : "gray"} />
        </TouchableOpacity>

      </Animated.View>

      {/* Yemek Aciklamasi */}
      {
        loading ? (
          <Loading size="large" className="mt-16" />
        ) : (
          <View className="px-4 flex justify-between pt-8">
            <Text
              style={{ fontSize: hp(3) }}
              className="font-bold text-neutral-700"
            >
              {meal?.strMeal}
            </Text>

            <Text
              style={{ fontSize: hp(2) }}
              className="font-medium text-neutral-500 mt-2 mb-4"
            >
              {meal?.strArea}
            </Text>

            {/* misc*/}
            <Animated.View entering={FadeInDown.duration(700).springify().damping(12)} className="flex-row justify-around">


              <View className="flex rounded-full bg-amber-300 p-2">
                <View style={{ height: hp(6.5), width: hp(6.5) }} className="bg-white rounded-full flex items-center justify-center">
                  <ClockIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                </View>
                <View className="flex items-center py-2 space-y-1">
                  <Text style={{ fontSize: hp(2) }} className="font-bold text-neutral-700">
                    35
                  </Text>
                  <Text style={{ fontSize: hp(1.3) }} className="font-bold text-neutral-700">
                    Dakika
                  </Text>
                </View>
              </View>

              <View className="flex rounded-full bg-amber-300 p-2">
                <View style={{ height: hp(6.5), width: hp(6.5) }} className="bg-white rounded-full flex items-center justify-center">
                  <ClockIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                </View>
                <View className="flex items-center py-2 space-y-1">
                  <Text style={{ fontSize: hp(2) }} className="font-bold text-neutral-700">
                    03
                  </Text>
                  <Text style={{ fontSize: hp(1.3) }} className="font-bold text-neutral-700">
                    Porsiyon
                  </Text>
                </View>
              </View>

              <View className="flex rounded-full bg-amber-300 p-2">
                <View style={{ height: hp(6.5), width: hp(6.5) }} className="bg-white rounded-full flex items-center justify-center">
                  <ClockIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                </View>
                <View className="flex items-center py-2 space-y-1">
                  <Text style={{ fontSize: hp(2) }} className="font-bold text-neutral-700">
                    103
                  </Text>
                  <Text style={{ fontSize: hp(1.3) }} className="font-bold text-neutral-700">
                    Kal
                  </Text>
                </View>
              </View>

              {/* misc */}
              <View className="flex rounded-full bg-amber-300 p-2">
                <View style={{ height: hp(6.5), width: hp(6.5) }} className="bg-white rounded-full flex items-center justify-center">
                  <Square3Stack3DIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                </View>
                <View className="flex items-center py-2 space-y-1">
                  <Text style={{ fontSize: hp(2) }} className="font-bold text-neutral-700">

                  </Text>
                  <Text style={{ fontSize: hp(1.3) }} className="font-bold text-neutral-700">
                    Kolay
                  </Text>
                </View>
              </View>
            </Animated.View>


            {/* icerikler */}
            <Animated.View entering={FadeInDown.delay(200).duration(700).springify().damping(12)} className="space-y-4 mt-8">
              <Text style={{ fontSize: hp(2.5) }} className="font-bold flex-1 text-neutral-700">
                Icerikler
              </Text>
              <View className="space-y-2 ml-3">
                {
                  ingredientsIndexes(meal).map(i => {
                    return (
                      <View key={i} className="flex-row space-x-4 mt-2">
                        <View style={{ height: hp(1.5), width: hp(1.5) }}
                          className="bg-amber-300 rounded-full mr-4" />
                        <View className="flex-row space-x-2">
                          <Text>{meal["strIngredient" + i]}</Text>
                        </View>
                      </View>
                    )
                  })
                }
              </View>
            </Animated.View>

            {/*talimatler  */}
            <Animated.View entering={FadeInDown.delay(200).duration(700).springify().damping(12)} className="mt-8">

                <Text
                style={{fontSize: hp(2.5), marginBottom: hp(1.5)}}
                className="font-bold flex-1 text-neutral-700"
                >Talimatlar
                </Text>

                <Text
                style={{fontSize: hp(1.6), marginBottom: hp(2.5)}}
                className="text-neutral-700"
                >
                  {meal.strInstructions}
                </Text>
            </Animated.View>

                {/* tarif videosu */}
                {
                  meal?.strYoutube && (
                    <Animated.View entering={FadeInDown.delay(300).duration(700).springify().damping(12)} className="mt-8 mb-8">
                      <Text
                        style={{fontSize: hp(2.5), marginBottom: hp(2)}}
                         className="font-bold text-neutral-700">
                        Yemek Tarifi Videosu
                      </Text>
                      <View style={{marginTop: hp(1)}}>
                        <YoutubeIframe 
                          videoId={getYoutubeVideoId(meal.strYoutube)}
                          height={hp(30)}
                          width={wp(92)}
                        />
                      </View>
                   </Animated.View>
                  )
                }

          </View>
        )

      }


    </ScrollView>
  )
}

export default RecipeDetailScreen

