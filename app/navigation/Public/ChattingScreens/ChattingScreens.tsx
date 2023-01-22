import { View, Text } from "react-native"
import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import defaultHeaderOptions from "../../defaultHeaderOptions"
import { styleKit } from "../../../style"

import { ChatroomScreen } from "../../../screens/Chatting"

const Chatting = createStackNavigator()

type Props = {}


const ChattingScreens = (props: Props) => {
  const TOP_INSET = useSafeAreaInsets().top

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
      />
    </Chatting.Navigator>
  )
}

export default ChattingScreens
