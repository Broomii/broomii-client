import { View, Text } from "react-native"
import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import Ionicons from "@expo/vector-icons/Ionicons"
import colors from "../../style/colors"

import HomeNavigator from "./Home"
import ChattingNavigator from "./Chatting"
import SettingsNavigator from "./Settings"

const BottomTab = createBottomTabNavigator()

const TAB_ICON: {
  Home: string[]
  Chatting: string[]
  Settings: string[]
} = {
  Home: ["home-outline", "home"],
  Chatting: ["chatbox-ellipses-outline", "chatbox-ellipses"],
  Settings: ["settings-outline", "settings"],
}

const publicScreenOptions = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    const routeName: string = route.name
    const icon = {
      outline: 0,
      full: 1,
    } as const
    const iconName: string =
      TAB_ICON[routeName][focused ? icon.full : icon.outline]
    return <Ionicons name={iconName} size={size} color={color} />
  },
  tabBarActiveTintColor: colors.brand,
  tabBarInactiveTintColor: "gray",
  tabBarShowLabel: false,
})

const PublicScreensNavigator = () => {
  return (
    <>
      <BottomTab.Navigator
        screenOptions={publicScreenOptions}
        sceneContainerStyle={{ backgroundColor: "white" }}
      >
        <BottomTab.Screen name="Home" component={HomeNavigator} />
        <BottomTab.Screen name="Chatting" component={ChattingNavigator} />
        <BottomTab.Screen name="Settings" component={SettingsNavigator} />
      </BottomTab.Navigator>
    </>
  )
}

export default PublicScreensNavigator
