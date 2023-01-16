import { View, Text, Dimensions } from "react-native"
import React from "react"
import colors from "../../../../style/colors"
import { createMaterialTopTabNavigator, MaterialTopTabBar } from "@react-navigation/material-top-tabs"
import { Font } from "../../../../style/font"
import { BottomTabBarHeightContext } from "@react-navigation/bottom-tabs"

import OrderScreen from "../../../../screens/Order/OrderScreen"
import RiderScreen from "../../../../screens/Rider/RiderScreen"

type Props = {}
const Tab = createMaterialTopTabNavigator()

const TopTabBarNavigator = (props: Props) => {
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarIndicatorStyle: {
            backgroundColor: colors.brand,
            width: 50,
            left: "14%",
          },
          tabBarActiveTintColor: colors.primary,
          tabBarStyle: { width: "60%", elevation: 0 },
          tabBarPressColor: "transparent",
          tabBarLabelStyle: {
            fontFamily: Font.FontWeight.Medium,
            fontSize: Font.FontSize.H3,
            lineHeight: 30,
            margin: 0
          },
          tabBarContentContainerStyle: {
            paddingBottom: 0,
            paddingTop: 10
          },
        }}
        sceneContainerStyle={{ backgroundColor: "white" }}
      >
        <Tab.Screen name="주문하기" component={OrderScreen} />
        <Tab.Screen name="배달하기" component={RiderScreen} />
      </Tab.Navigator>
    </>
  )
}

export default TopTabBarNavigator
