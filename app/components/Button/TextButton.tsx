import { View, Text, Pressable, TextStyle, ViewStyle } from "react-native"
import React from "react"
import styles from "./TextButton.styles"

type Props = {
  onPress: () => null
  title: string
  titleStyle?: TextStyle
  containerStyle?: ViewStyle
}

const TextButton = ({ onPress, title, titleStyle, containerStyle }: Props) => {
  return (
    <Pressable
      style={({ pressed }) => [containerStyle, pressed ? { opacity: 0.7 } : {}]}
    >
      <Text style={styles.textButtonTitle}>{title}</Text>
    </Pressable>
  )
}

export default TextButton
