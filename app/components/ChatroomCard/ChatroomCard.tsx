import { View, Image } from "react-native"
import React from "react"

import Text from "../Text"

import { styleKit } from "../../style"
import styles from "./ChatroomCard.styles"

type Props = {}

const ChatroomCard = (props: Props) => {
  return (
    <View
      style={[styleKit.layout.containerWithHorizontalFlex, styles.container]}
    >
      <Image
        style={styles.icon}
        source={require("../../../assets/icons/profile.png")}
      />
      <View style={styles.textSection}>
        <View
          style={[
            styleKit.layout.containerWithHorizontalFlex,
            styles.usernameAndTimePastContainer,
          ]}
        >
          <Text style={styles.username}>멍충멍충</Text>
          <Text style={styles.timePast}>6분 전</Text>
        </View>
        <Text style={styles.lastChat}>지금 나와있어여</Text>
      </View>
    </View>
  )
}

export default ChatroomCard
