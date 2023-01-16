import { View, Text, Image, StyleSheet } from "react-native"
import React from "react"
import { Font } from "../../style/font"
import { isAOS } from "../../utils/platform"
type Props = {}

const styles = StyleSheet.create({
  logo: {
    height: 35,
    width: 73,
    marginTop: isAOS ? 13 : 0,
    marginHorizontal: 0,
  },
})

const Logo = (props: Props) => {
  return (
    <Image
      style={styles.logo}
      source={require("../../../assets/images/logo.png")}
    />
  )
}

export default Logo
