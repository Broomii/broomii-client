import { View, Text } from "react-native"
import React from "react"

import Card from "../../components/Card"

type Props = {}

const RiderScreen = (props: Props) => {
  return (
    <View style={{ flex: 1 }}>
      <Card />
      <Card />
    </View>
  )
}

export default RiderScreen
