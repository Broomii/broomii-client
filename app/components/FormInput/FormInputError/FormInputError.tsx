import { View, Text } from "react-native"
import React from "react"
import styles from "./FormInputError.styles"

type Props = {
  children: React.ReactNode
}

const FormInputError = ({ children }: Props) => {
  return (
    <>
      <Text style={styles.errorMessage}>{children}</Text>
    </>
  )
}

export default FormInputError
