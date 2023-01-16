import { View } from 'react-native'
import React from 'react'

import Text from "../../../components/Text"
import { Button } from "../../../components/Button"
import Emoji from "../../../../assets/icons/sleepy"

import styles from "./OrderScreenWithoutOrder.styles"

type Props = {}

const OrderScreenWithoutOrder = (props: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.emojiContainer}>
        <Emoji />
      </View>
      <Text style={styles.label}>아직 요청한 주문이 없어요</Text>
      <Button style={styles.button} variant="default" title="주문하기" onPress={() => null}/>
    </View>
  )
}

export default OrderScreenWithoutOrder