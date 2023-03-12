import { View, Text, Pressable, TextStyle, ViewStyle } from "react-native"
import React from "react"
import styles from "./TextButton.styles"

type Props = {
  onPress: () => void
  title: string
  titleStyle?: TextStyle
  containerStyle?: ViewStyle
}

const TextButton = ({ onPress, title, titleStyle, containerStyle }: Props) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [containerStyle, pressed ? { opacity: 0.7 } : {}]}
    >
      <Text style={[styles.textButtonTitle, titleStyle]}>{title}</Text>
    </Pressable>
  )
}

export default TextButton
