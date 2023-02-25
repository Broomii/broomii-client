import { View, ScrollView, Animated } from "react-native"
import React, { useEffect, useState } from "react"
import { Ionicons } from "@expo/vector-icons"
import { RouteProp, useNavigation } from "@react-navigation/native"
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { useSelector } from "react-redux"
import axios from "axios"

import Text from "../../components/Text"
import {
  Button,
  HeaderRightMenuButton,
  StateButton,
} from "../../components/Button"
import Profile from "../../components/Profile"
import OverlayMenu from "../../components/OverlayMenu"

import { styleKit } from "../../style"
import styles from "./PostScreen.styles"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { BottomTabParamList } from "../../navigation/Public/BottomTabBar"

import { useAppDispatch, RootState } from "../../redux/store"
import {
  fetchSinglePost,
  PostType,
  deleteSinglePost,
  changeDeliveryStatus,
} from "../../redux/Post/postSlice"
import { notifyToRefetch } from "../../redux/Rider/riderSlice"

import { getJWT } from "../../utils/secureStore/secureStore"
import { StackNavigationProp } from "@react-navigation/stack"
import { PublicStackParamList } from "../../navigation/Public/PublicScreensNavigator"

type TabNavigationProp = BottomTabNavigationProp<BottomTabParamList, "Home">

type NavigateToEditorProp = StackNavigationProp<PublicStackParamList, "Editor">

type PostScreenProps = {
  route: RouteProp<{ params: { id: number } }, "params">
}

const PostScreen = ({ route }: PostScreenProps) => {
  const { id } = route.params
  const BOTTOM_INSET: number = useSafeAreaInsets().bottom

  const navigation = useNavigation<TabNavigationProp>()
  const editorNavigation = useNavigation<NavigateToEditorProp>()

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
    flag,
    requirement,
  }: PostType = post

  const [postActionOverlayVisible, setPostActionOverlayVisible] =
    useState(false)

  const [stateActionOverlayVisible, setStateActionOverlayVisible] =
    useState(false)

  const togglePostActionOverlay = () => {
    setPostActionOverlayVisible(!postActionOverlayVisible)
  }

  const toggleStateActionOverlay = () => {
    setStateActionOverlayVisible(!stateActionOverlayVisible)
  }

  const handleGoToChatting = () => {
    navigation.navigate("Chatting")
  }

  const handleEditPressed = () => {
    setPostActionOverlayVisible(false)
    editorNavigation.navigate("Editor", { postToEdit: post })
  }

  const handleDeletePressed = () => {
    getJWT((jwt) =>
      dispatch(deleteSinglePost({ jwt, id }))
        .unwrap()
        .then((succeeded) => {
          if (succeeded) {
            dispatch(notifyToRefetch())
            setPostActionOverlayVisible(false)
            navigation.navigate("Home")
          }
        }),
    )
  }

  const handleChangeStatusTo = (status: "pending" | "inProgress" | "done") => {
    if (status !== post.deliveryStatus) {
      return () => {
 
        getJWT((jwt) =>
          dispatch(
            changeDeliveryStatus({
              jwt,
              id: post.id as number,
              status,
            }),
          ).then(() => {
            setStateActionOverlayVisible(false)
            dispatch(notifyToRefetch())
          }),
        )
      }
    }
  }

  useEffect(() => {
    getJWT((jwt) => dispatch(fetchSinglePost({ id, jwt })))
  }, [id])

  useEffect(() => {
    if (flag) {
      navigation.setOptions({
        headerRight: () => (
          <HeaderRightMenuButton onPress={togglePostActionOverlay} />
        ),
      })
    } else {
    }
  }, [postActionOverlayVisible, flag])

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
            {flag === 1 ? (
              <StateButton
                status={deliveryStatus as "pending" | "inProgress" | "done"}
                onPress={toggleStateActionOverlay}
              />
            ) : (
              <></>
            )}
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
        <OverlayMenu
          menuList={[
            { menuName: "수정하기", menuAction: handleEditPressed },
            { menuName: "삭제하기", menuAction: handleDeletePressed },
          ]}
          onBackDropPress={togglePostActionOverlay}
          isVisible={postActionOverlayVisible}
        />
        <OverlayMenu
          menuList={[
            {
              menuName: "대기 중",
              menuAction: handleChangeStatusTo("pending") as () => void,
            },
            {
              menuName: "배달 중",
              menuAction: handleChangeStatusTo("inProgress") as () => void,
            },
            {
              menuName: "배달 완료",
              menuAction: handleChangeStatusTo("done") as () => void,
            },
          ]}
          onBackDropPress={toggleStateActionOverlay}
          isVisible={stateActionOverlayVisible}
          containerStyle={{ paddingBottom: BOTTOM_INSET / 2 }}
        />
      </View>
    </>
  )
}

export default PostScreen
