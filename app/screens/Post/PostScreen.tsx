import { View, ScrollView } from "react-native"
import React, { useEffect, useState } from "react"
import { Ionicons } from "@expo/vector-icons"
import { RouteProp, useNavigation } from "@react-navigation/native"
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { useSelector } from "react-redux"

import Text from "../../components/Text"
import { Button } from "../../components/Button"
import Profile from "../../components/Profile"

import { styleKit } from "../../style"
import styles from "./PostScreen.styles"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { BottomTabParamList } from "../../navigation/Public/BottomTabBar"

import { useAppDispatch, RootState } from "../../redux/store"
import { fetchSinglePost, PostType, setBackStatus } from "../../redux/Post/postSlice"

type PostNavigationProp = BottomTabNavigationProp<
  BottomTabParamList,
  "Chatting"
>

type PostScreenProps = {
  route: RouteProp<{ params: { id: number } }, "params">
}

const PostScreen = ({ route }: PostScreenProps) => {
  const { id } = route.params
  const BOTTOM_INSET: number = useSafeAreaInsets().bottom

  const navigation = useNavigation<PostNavigationProp>()

  const dispatch = useAppDispatch()
  const {
    post,
    status: postStatus,
    error: postError,
  } = useSelector((state: RootState) => state.post)

  const {
    title,
    deliveryAddress,
    nickName,
    storeName,
    totalPrice,
    deliveryPay,
    deliveryStatus,
    requirement,
  }: PostType = post

  const handleGoToChatting = () => {
    navigation.navigate("Chatting")
  }
  
  useEffect(() => {
    dispatch(fetchSinglePost(id))
  }, [id])

  return (
    <>
      <ScrollView>
        <View style={[styleKit.layout.containerWithPadding, styles.container]}>
          <Profile username={nickName} />

          <View style={styles.titleSection}>
            {/* Button */}
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.time}>20분 전</Text>
            <Text style={styles.shopName}>매장명 : {storeName}</Text>
            <Text style={styles.totalPrice}>주문 금액 : {totalPrice}원</Text>
          </View>
          {/* Content Section */}
          <View style={styles.contentCotainer}>
            <Text style={styles.content}>{requirement}</Text>
          </View>
        </View>
      </ScrollView>
      {/* Sticky Button Section */}
      <View
        style={[
          styleKit.layout.containerWithHorizontalFlex,
          styles.buttonSection,
          { bottom: BOTTOM_INSET },
        ]}
      >
        <View>
          <View style={styleKit.layout.containerWithHorizontalFlex}>
            <Ionicons style={styles.tipAndLocation} name="location-outline" />
            <Text style={styles.tipAndLocation}>배달 장소</Text>
          </View>
          <Text style={styles.tipAndLocationValue}>{deliveryAddress}</Text>
        </View>
        <View>
          <Text style={styles.tipAndLocation}>배달팁</Text>
          <Text style={styles.tipAndLocationValue}>{deliveryPay}원</Text>
        </View>
        <Button
          title="진행 중인 채팅 보기"
          variant="smallButton"
          onPress={handleGoToChatting}
        />
      </View>
    </>
  )
}

export default PostScreen
