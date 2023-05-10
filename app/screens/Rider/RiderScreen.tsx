import { View, Text, FlatList } from "react-native"
import React, { useEffect, useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { useDispatch, useSelector } from "react-redux"
import { PayloadAction } from "@reduxjs/toolkit"

import {
  fetchGigList,
  filterGigs,
  GigCellType,
} from "../../redux/Rider/riderSlice"
import { RootState, useAppDispatch } from "../../redux/store"

import Card from "../../components/Card"
import RiderListHeader from "./components/RiderListHeader/RiderListHeader"

import { PublicStackParamList } from "../../navigation/Public/PublicScreensNavigator"
import { FAB } from "../../components/Button"

import { getJWT } from "../../utils/secureStore/secureStore"

type Props = {}

type RiderNavigationProp = StackNavigationProp<
  PublicStackParamList,
  "BottomTabBar"
>
const RiderScreen = (props: Props) => {
  const navigation = useNavigation<RiderNavigationProp>()

  const dispatch = useAppDispatch()
  const {
    gigList,
    filteredGigList,
    status: gigListStatus,
    error: gigListError,
    shouldRefetch,
  } = useSelector((state: RootState) => state.rider)

  const [isEnabled, setIsEnabled] = useState(false)
  const toggleSwitch = () => {
    dispatch(filterGigs(isEnabled))
    setIsEnabled((previousState: boolean) => !previousState)
  }
  
  useEffect(() => {
    // console.log("rider screen hit")
    if (gigListStatus === "idle" || shouldRefetch) {
      getJWT((jwt) => dispatch(fetchGigList(jwt)))
    }
  }, [dispatch, gigListStatus, gigList, shouldRefetch])

  const renderItem = ({
    item = {
      id: 1,
      title: "title",
      deliveryAddress: "",
      deliveryPay: 0,
      deliveryStatus: "done",
    },
  }: {
    item: GigCellType
  }) => {
    const { id, title, deliveryAddress, deliveryPay, deliveryStatus } = item
    return (
      <Card
        title={title}
        location={deliveryAddress}
        price={deliveryPay}
        variant={deliveryStatus}
        onPress={() => {
          navigation.navigate("Post", { id })
        }}
      />
    )
  }

  return (
    <>
      <View style={{ flex: 1 }}>
        <FlatList
          data={filteredGigList}
          renderItem={renderItem}
          ListHeaderComponent={
            <RiderListHeader
              isSwitchOn={isEnabled}
              onValueChange={toggleSwitch}
            />
          }
        />
      </View>
      <FAB
        onPress={() => navigation.navigate("Editor", { postToEdit: null })}
      />
    </>
  )
}

export default RiderScreen
