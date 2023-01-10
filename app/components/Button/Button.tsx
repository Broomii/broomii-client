import { View, Text, Button as ButtonRN } from "react-native"
import React from "react"
import { ButtonProps } from "react-native"

const Button = ({ onPress, title }: ButtonProps) => {
  return <ButtonRN title={title} onPress={onPress} />
}

export default Button
