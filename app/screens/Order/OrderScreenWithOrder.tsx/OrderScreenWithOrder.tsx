import { View, Text } from 'react-native'
import React from 'react'

import Card from "../../../components/Card"

import styles from "./OrderScreenWithOrder.styles"

type Props = {}

const OrderScreenWithOrder = (props: Props) => {
  return (
    <View style={styles.orderScreenContainer}>
      <Card variant="inProgress"/>
      <Card variant="done" />
    </View>
  )
}

export default OrderScreenWithOrder