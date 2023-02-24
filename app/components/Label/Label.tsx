import { View, Text, TextProps } from "react-native"
import React from "react"

import styles from "./Label.styles"

type Props = {}

const Label = ({ children }: TextProps) => {
  return <Text style={styles.label}>{children}</Text>
}

export default Label
