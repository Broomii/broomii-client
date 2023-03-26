import { View, Text } from "react-native"
import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { RouteProp } from "@react-navigation/native"

import defaultHeaderOptions from "../../defaultHeaderOptions"
import { styleKit } from "../../../style"

import { ChatroomScreen } from "../../../screens/Chatting"
import { PublicStackParamList } from "../PublicScreensNavigator"
import { PostType } from "../../../redux/Post/postSlice"

const Chatting = createStackNavigator()

type Props = {}

export type ChattingStackParamList = {
  Chatroom: { postId: number }
}

type ChattingScreensRouteProp = RouteProp<
  PublicStackParamList,
  "ChattingScreens"
>

type ChattingScreensProps = {
  route: ChattingScreensRouteProp
}

const ChattingScreens = ({ route }: ChattingScreensProps) => {
  const TOP_INSET = useSafeAreaInsets().top
  const params = route.params
  const chatroomParam = { postId: params.postId }
  
  return (
    <Chatting.Navigator
      screenOptions={{
        ...defaultHeaderOptions(TOP_INSET),
        headerBackTitle: "",
        cardStyle: {
          backgroundColor: styleKit.colors.primaryInvert,
        },
      }}
    >
      <Chatting.Screen
        name="Chatroom"
        component={ChatroomScreen}
        options={{ title: "멍충멍충" }}
        initialParams={chatroomParam}
      />
    </Chatting.Navigator>
  )
}

export default ChattingScreens
