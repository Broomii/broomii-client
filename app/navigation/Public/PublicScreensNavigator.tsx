import React from "react"
import { View, Text } from "react-native"
import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs"
import { RouteProp } from "@react-navigation/native"
import Ionicons from "@expo/vector-icons/Ionicons"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import colors from "../../style/colors"
import { Font } from "../../style/font"
import { isAOS } from "../../utils/platform"

import Logo from "../../components/Logo"
import HomeNavigator from "./Home"
import ChattingNavigator from "./Chatting"
import SettingsNavigator from "./Settings"

type BottomTabParamList = {
  Home: undefined
  Chatting: undefined
  Settings: undefined
}

const BottomTab = createBottomTabNavigator<BottomTabParamList>()

const TAB_ICON: {
  Home: string
  Chatting: string
  Settings: string
} = {
  Home: "home-outline",
  Chatting: "chatbubble-ellipses-outline",
  Settings: "person-outline",
}

type IconProps = {
  color: string
}

let TOP_INSET: number

const publicScreenOptions = ({
  route,
}: BottomTabScreenProps<BottomTabParamList>) => ({
  tabBarIcon: ({ color }: IconProps) => {
    const routeName: "Home" | "Chatting" | "Settings" = route.name
    const iconName: string = TAB_ICON[routeName]

    return <Ionicons name={iconName} size={27} color={color} />
  },
  tabBarActiveTintColor: colors.primary,
  tabBarInactiveTintColor: colors.gray300,
  tabBarShowLabel: false,
  tabBarStyle: {
    height: isAOS ? 55 : 75,
    paddingTop: isAOS ? 0 : 13,
  },
  headerTitleStyle: {
    fontFamily: Font.FontWeight.Bold,
    fontSize: Font.FontSize.H3,
  },
  headerTitleAlign: "left",
  headerTitleContainerStyle: {
    paddingBottom: 10,
  },

  headerShown: true,
})

const PublicScreensNavigator = () => {
  TOP_INSET = useSafeAreaInsets().top

  return (
    <>
      <BottomTab.Navigator
        screenOptions={publicScreenOptions}
        sceneContainerStyle={{ backgroundColor: colors.primaryInvert }}
      >
        <BottomTab.Screen
          name="Home"
          component={HomeNavigator}
          options={{
            headerTitle: (props) => <Logo {...props} />,
            headerStyle: {
              height: 55 + TOP_INSET,
              borderBottomColor: "white",
            },
            headerTitleContainerStyle: {
              paddingTop: 10,
              paddingLeft: 0
            },
            headerShadowVisible: false,
          }}
        />
        <BottomTab.Screen
          name="Chatting"
          component={ChattingNavigator}
          options={{
            headerTitle: "채팅",
            headerStyle: {
              height: 52 + TOP_INSET,
            },
          }}
        />
        <BottomTab.Screen
          name="Settings"
          component={SettingsNavigator}
          options={{
            headerTitle: "마이페이지",
            headerStyle: {
              height: 52 + TOP_INSET,
            },
          }}
        />
      </BottomTab.Navigator>
    </>
  )
}

export default PublicScreensNavigator
