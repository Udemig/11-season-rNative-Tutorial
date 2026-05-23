import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const  Features = () => {
  return (
    <View style={{height: hp(60)}} className='space-y-4'>
      <Text style={{fontSize: wp(6.5)}} className='font-semibold text-gray-700'> Ozellikler </Text>

      <View className='bg-emerald-200 p-4 rounded-xl mb-4'>
            <View className='flex-row items-center space-x-1'>
                <Image source={require("../../assets/images/chatgpticon.png")} style={{height: hp(4), width: hp(4)}} />
                <Text style={{fontSize: wp(4.8)}} className='font-semibold text-gray-700'>UdemigGPT</Text>
            </View>
            <Text style={{fontSize: wp(3.8)}} className='text-gray-700 font-medium'>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the en an unknown mbled it to make a type specimen book
            </Text>
      </View>

      <View className='bg-purple-200 p-4 rounded-xl mb-4'>
            <View className='flex-row items-center space-x-1'>
                <Image source={require("../../assets/images/dalleicon.png")} style={{height: hp(4), width: hp(4)}} />
                <Text style={{fontSize: wp(4.8)}} className='font-semibold text-gray-700'>DALL-E</Text>
            </View>
            <Text style={{fontSize: wp(3.8)}} className='text-gray-700 font-medium'>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the en an unknown mbled it to make a type specimen book
            </Text>
      </View>


      <View className='bg-cyan-200 p-4 rounded-xl mb-4'>
            <View className='flex-row items-center space-x-1'>
                <Image source={require("../../assets/images/smartaiicon.png")} style={{height: hp(4), width: hp(4)}} />
                <Text style={{fontSize: wp(4.8)}} className='font-semibold text-gray-700'>UdemigAI</Text>
            </View>
            <Text style={{fontSize: wp(3.8)}} className='text-gray-700 font-medium'>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the en an unknown mbled it to make a type specimen book
            </Text>
      </View>

    </View>
  )
}

export default Features

const styles = StyleSheet.create({})