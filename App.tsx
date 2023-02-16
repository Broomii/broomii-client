import "react-native-gesture-handler"
import { StatusBar } from "expo-status-bar"
import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { Provider } from "react-redux"

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

import { store } from "./app/redux/store"
import { AuthProvider } from "./app/context/AuthContext"

export default function App() {
  const [fontsLoaded] = useFonts({
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
      <Provider store={store}>
        <AuthProvider>
          <SafeAreaProvider>
            <Navigation />
          </SafeAreaProvider>
        </AuthProvider>
      </Provider>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
