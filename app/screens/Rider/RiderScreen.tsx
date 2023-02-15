import { View, Text, FlatList } from "react-native"
import React from "react"

import Card from "../../components/Card"

type Props = {}

type DeliveryItemType = {
  id: number
  title: string
  deliveryAddress: string
  deliveryPay: number
}

const data: DeliveryItemType[] = [
  {
    id: 1,
    title: "test 1",
    deliveryAddress: "test ad 1",
    deliveryPay: 1000,
  },
  {
    id: 2,
    title: "test 2",
    deliveryAddress: "test ad 2",
    deliveryPay: 2000,
  },
  {
    id: 3,
    title: "test 3",
    deliveryAddress: "test ad 3",
    deliveryPay: 3000,
  },
  {
    id: 4,
    title: "test 4",
    deliveryAddress: "test ad 4",
    deliveryPay: 4000,
  },
  {
    id: 5,
    title: "test 5",
    deliveryAddress: "test ad 5",
    deliveryPay: 5000,
  },
  {
    id: 6,
    title: "test 6",
    deliveryAddress: "test ad 6",
    deliveryPay: 6000,
  },
  {
    id: 7,
    title: "test 7",
    deliveryAddress: "test ad 7",
    deliveryPay: 7000,
  },
]

const RiderScreen = (props: Props) => {
  const renderItem = ({ item }: { item: DeliveryItemType }) => {
    const { id, title, deliveryAddress, deliveryPay } = item
    return (
      <Card
        title={title}
        location={deliveryAddress}
        price={deliveryPay}
        onPress={() => {
          console.log(id)
        }}
      />
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList data={data} renderItem={renderItem} />
    </View>
  )
}

export default RiderScreen
