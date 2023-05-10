import { View, Image, TouchableNativeFeedback, Pressable } from "react-native"
import React from "react"

import Text from "../Text"
import { isAOS } from "../../utils/platform"

import { styleKit } from "../../style"
import styles from "./ChatroomCard.styles"

type Props = {
  onPress?: () => void
  sender: string
}

const ChatroomCard = ({ onPress, sender }: Props) => {
  const child = (
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
          <Text style={styles.username}>{sender}</Text>
          {/* <Text style={styles.timePast}>6분 전</Text> */}
        </View>
        {/* <Text style={styles.lastChat}>지금 나와있어여</Text> */}
      </View>
    </View>
  )

  return isAOS ? (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple(
        styleKit.colors.gray100,
        false,
        undefined,
      )}
      onPress={onPress}
    >
      {child}
    </TouchableNativeFeedback>
  ) : (
    <Pressable
      style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
      onPress={onPress}
    >
      {child}
    </Pressable>
  )
}

export default ChatroomCard
