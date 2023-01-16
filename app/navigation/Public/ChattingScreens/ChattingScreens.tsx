import { View, Text } from "react-native"
import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

const  Chatting = createStackNavigator()

type Props = {}

const Chatroom = () => <Text>Chatroom</Text>

const ChattingScreens = (props: Props) => {
  return (
    <Chatting.Navigator>
      <Chatting.Screen name="Chatroom" component={Chatroom} />
    </Chatting.Navigator>
  )
}

export default ChattingScreens
