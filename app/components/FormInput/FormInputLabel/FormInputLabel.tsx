import { View, Text, TextStyle, TextProps } from "react-native"
import React from "react"
import styles from "./FormInputLabel.styles"

type Props = {
  children: React.ReactNode,
  style?: TextStyle,
}

const FormInputLabel = ({ children, style }: Props) => {
  return (
    <>
      <Text style={{ ...styles.formInputLabel, ...style }}>{children}</Text>
    </>
  )
}

export default FormInputLabel
