import { View, Text, ScrollView } from "react-native"
import React from "react"
import { StackNavigationProp } from "@react-navigation/stack"

import { PublicStackParamList } from "../../../navigation/Public/PublicScreensNavigator"

import Card from "../../../components/Card"
import { FAB } from "../../../components/Button"

import styles from "./OrderScreenWithOrder.styles"
import { useNavigation } from "@react-navigation/native"

type OrderScreenProp = StackNavigationProp<PublicStackParamList, "BottomTabBar">
type Prop = {}
const OrderScreenWithOrder = (props: Prop) => {
  const navigation = useNavigation<OrderScreenProp>()

  return (
    <>
      <ScrollView style={styles.orderScreenContainer}>
        <Card
          title="ssadfsadf"
          variant="inProgress"
          onPress={() => navigation.navigate("Post")}
        />
        <Card variant="done" />
        <Card variant="done" />
        <Card variant="done" />
        <Card variant="done" />
      </ScrollView>
      <FAB onPress={() => navigation.navigate("Editor")} />
    </>
  )
}

export default OrderScreenWithOrder
