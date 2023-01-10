import { View, Text } from "react-native"
import React from "react"
import colors from "../../style/colors"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"

type Props = {}
const Tab = createMaterialTopTabNavigator()

const OrderScreen = () => <Text>order</Text>
const RiderScreen = () => <Text>rider</Text>

const HomeNavigator = (props: Props) => {
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarIndicatorStyle: {
            backgroundColor: colors.brand,
          },
          tabBarActiveTintColor: "black",
          tabBarStyle: { width: "50%", elevation: 0 },
          tabBarPressColor: "transparent"
        }}
        sceneContainerStyle={{ backgroundColor: "white" }}
      >
        <Tab.Screen name="주문하기" component={OrderScreen} />
        <Tab.Screen name="배달하기" component={RiderScreen} />
      </Tab.Navigator>
    </>
  )
}

export default HomeNavigator
