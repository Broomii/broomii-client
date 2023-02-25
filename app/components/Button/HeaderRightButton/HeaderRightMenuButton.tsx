import { View, Text, Pressable } from "react-native"
import React from "react"
import { Entypo } from "@expo/vector-icons"

import styles from "./HeaderRightMenuButton.styles"

type Props = {
  onPress: () => void
}

const HeaderRightMenuButton = ({ onPress }: Props) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Entypo name="dots-three-vertical" size={24} color="black" />
    </Pressable>
  )
}

export default HeaderRightMenuButton
