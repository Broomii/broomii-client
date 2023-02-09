import "react-native-gesture-handler"
import { StatusBar } from "expo-status-bar"
import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { SafeAreaProvider } from "react-native-safe-area-context"

import Navigation from "./app/navigation"
import {
  useFonts,
  NotoSansKR_100Thin,
  NotoSansKR_300Light,
  NotoSansKR_400Regular,
  NotoSansKR_500Medium,
  NotoSansKR_700Bold,
  NotoSansKR_900Black,
} from "@expo-google-fonts/noto-sans-kr"

import { AuthProvider } from "./app/context/AuthContext"

export default function App() {
  let [fontsLoaded] = useFonts({
    NotoSansKR_100Thin,
    NotoSansKR_300Light,
    NotoSansKR_400Regular,
    NotoSansKR_500Medium,
    NotoSansKR_700Bold,
    NotoSansKR_900Black,
  })

  // useSafeAreaInsets()
  if (!fontsLoaded) {
    return <StatusBar />
  } else
    return (
      <AuthProvider>
        <SafeAreaProvider>
          <Navigation />
        </SafeAreaProvider>
      </AuthProvider>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
