import { View, Text, TextStyle } from "react-native"
import React from "react"
import styles from "./FormInputError.styles"

type Props = {
  children: React.ReactNode
  style?: TextStyle
}

const FormInputError = ({ children, style }: Props) => {
  return (
    <>
      <Text style={[styles.errorMessage, style]}>{children}</Text>
    </>
  )
}

export default FormInputError
