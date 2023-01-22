import { View, Text } from "react-native"
import React from "react"
import { StackNavigationProp } from "@react-navigation/stack"
import { useNavigation } from "@react-navigation/native"

import ChatroomCard from "../../components/ChatroomCard"
import { PublicStackParamList } from "../../navigation/Public/PublicScreensNavigator"

import styles from "./ChattingScreen.styles"
type Prop = {}

type ChattingScreenProp = StackNavigationProp<PublicStackParamList, "">

const ChattingScreen = (props: Props) => {
  const navigation = useNavigation<ChattingScreenProp>()

  return (
    <View style={styles.container}>
      <ChatroomCard onPress={() => navigation.navigate("ChattingScreens")} />
    </View>
  )
}

export default ChattingScreen
