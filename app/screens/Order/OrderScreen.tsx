import { View } from "react-native"
import React from "react"
import Text from "../../components/Text"

import OrderScreenWithOrder from "./OrderScreenWithOrder.tsx/OrderScreenWithOrder"
import OrderScreenWithoutOrder from "./OrderScreenWithoutOrder.tsx/OrderScreenWithoutOrder"

type Props = {}

const OrderScreen = (props: Props) => {
  const anyOrder: boolean = true

  return (
    <>{anyOrder ? <OrderScreenWithOrder /> : <OrderScreenWithoutOrder />}</>
  )
}

export default OrderScreen
