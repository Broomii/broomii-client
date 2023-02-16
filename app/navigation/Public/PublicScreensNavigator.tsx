import React from "react"
import { View, Text } from "react-native"
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import BottomTabBar from "./BottomTabBar"
import ChattingScreens from "./ChattingScreens"
import SettingsScreens from "./SettingsScreens"
import EditorScreen from "../../screens/Order/Editor/EditorScreen"
import PostScreen from "../../screens/Post/PostScreen"
import { HeaderRightButton } from "../../components/Button"

import defaultHeaderOptions from "../defaultHeaderOptions"

import { styleKit } from "../../style"

export type PublicStackParamList = {
  BottomTabBar: undefined
  Editor: undefined
  Post: { id: number }
  ChattingScreens: undefined
}

const Public = createStackNavigator<PublicStackParamList>()

const publicScreenOptions = (TOP_INSET: number) => ({
  ...defaultHeaderOptions(TOP_INSET),
  cardStyle: { backgroundColor: styleKit.colors.primaryInvert },
  ...TransitionPresets.SlideFromRightIOS,
})

const PublicScreensNavigator = () => {
  const TOP_INSET: number = useSafeAreaInsets().top

  return (
    <Public.Navigator screenOptions={publicScreenOptions(TOP_INSET)}>
      <Public.Screen
        name="BottomTabBar"
        component={BottomTabBar}
        options={{ headerShown: false }}
      />
      <Public.Screen
        name="Editor"
        component={EditorScreen}
        options={{
          headerTitle: "주문서 작성하기",
          headerBackTitle: "Back",
          headerRight: () => <HeaderRightButton />,
        }}
      />
      <Public.Screen
        name="Post"
        component={PostScreen}
        options={{
          headerTitle: "",
          headerBackTitle: "Back",
        }}
      />
      <Public.Screen
        name="ChattingScreens"
        component={ChattingScreens}
        options={{ headerShown: false }}
      />
      {/* SettingsScreens */}
    </Public.Navigator>
  )
}

export default PublicScreensNavigator
