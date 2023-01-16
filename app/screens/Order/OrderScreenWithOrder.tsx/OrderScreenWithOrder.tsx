import { View, Text } from "react-native"
import React from "react"
import { StackScreenProps, StackNavigationProp } from "@react-navigation/stack"

import { PublicStackParamList } from "../../../navigation/Public/PublicScreensNavigator"

import Card from "../../../components/Card"
import { FAB } from "../../../components/Button"

import styles from "./OrderScreenWithOrder.styles"
import { useNavigation } from "@react-navigation/native"


type OrderScreenProp = StackNavigationProp<PublicStackParamList, "BottomTabBar">
type Prop = {}
const OrderScreenWithOrder = (props: Prop) => {
  const navigation = useNavigation<OrderScreenProp>();

  return (
    <View style={styles.orderScreenContainer}>
      <Card variant="inProgress" onPress={() => navigation.navigate("Post")}/>
      <Card variant="done" />
      <FAB onPress={() => navigation.navigate("Editor")}/>
    </View>
  )
}

export default OrderScreenWithOrder
