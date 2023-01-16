import { Pressable, Text } from "react-native"
import React from "react"

import styles from "./HeaderRightButton.style"

type Props = {}

const HeaderRightButton = (props: Props) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        { opacity: pressed ? 0.5 : 1 },
      ]}
    >
      <Text style={styles.textButton}>완료</Text>
    </Pressable>
  )
}

export default HeaderRightButton
