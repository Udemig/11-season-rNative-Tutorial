import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'


const RecipeDetailScreen = () => {
  return (
    <ScrollView
      className="bg-white flex-1"
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{paddingBottom: 30}}
    >
      <StatusBar barStyle="light-content" />
      <View className="flex-row justify-center">
        
      </View>

    </ScrollView>
  )
}

export default RecipeDetailScreen

const styles = StyleSheet.create({})