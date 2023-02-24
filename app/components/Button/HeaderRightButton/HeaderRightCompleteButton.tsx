import { Pressable, Text } from "react-native"
import React from "react"

import styles from "./HeaderRightCompleteButton.style"

type Props = {
  title: string
  onPress?: () => void
}

const HeaderRightCompleteButton = ({ title, onPress }: Props) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        { opacity: pressed ? 0.5 : 1 },
      ]}
      onPress={onPress}
    >
      <Text style={styles.textButton}>{title}</Text>
    </Pressable>
  )
}

export default HeaderRightCompleteButton
