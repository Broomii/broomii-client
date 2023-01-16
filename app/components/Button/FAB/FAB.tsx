import { View, Pressable, PressableProps } from "react-native"
import React from "react"

import Text from "../../Text"
import { AntDesign } from "@expo/vector-icons"
import { styleKit } from "../../../style"

import styles from "./FAB.styles"

type Props = {}

const FAB = (props: PressableProps) => {
  return (
    <Pressable
      {...props}
      style={({ pressed }) => [
        styleKit.layout.containerWithHorizontalFlex,
        styles.container,
        { opacity: pressed ? 0.9 : 1 },
      ]}
    >
      <AntDesign style={styles.icon} name="plus" />
      <Text style={styles.text}>주문서 작성</Text>
    </Pressable>
  )
}

export default FAB
