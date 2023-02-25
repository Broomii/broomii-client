import { View, Pressable, ViewStyle } from "react-native"
import React from "react"
import { AntDesign } from '@expo/vector-icons'; 

import Text from "../../Text"

import styles from "./StateButton.styles"

type StateButtonProps = {
  status: "pending" | "inProgress" | "done" 
  onPress: () => void
  containerStyle?: ViewStyle
}

const StateButton = ({ status, onPress, containerStyle }: StateButtonProps) => {
  const title = {
    pending: "대기 중",
    inProgress: "배달 중",
    done: "배달 완료",
  }

  return (
    <Pressable onPress={onPress} style={[styles.container, containerStyle]}>
      <Text style={styles.title}>{title[status]}</Text>
      <AntDesign name="down" size={16} color="black" />
    </Pressable>
  )
}

export default StateButton
