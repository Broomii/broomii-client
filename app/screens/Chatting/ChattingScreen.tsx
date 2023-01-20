import { View, Text } from "react-native"
import React from "react"

import ChatroomCard from "../../components/ChatroomCard"

import styles from "./ChattingScreen.styles"

type Props = {}

const ChattingScreen = (props: Props) => {
  return (
    <View style={styles.container}>
      <ChatroomCard />
    </View>
  )
}

export default ChattingScreen
