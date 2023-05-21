import { View, Text, FlatList } from "react-native"
import React, { useEffect, useState } from "react"
import { StackNavigationProp } from "@react-navigation/stack"
import { useNavigation } from "@react-navigation/native"

import { getTokenAsync } from "../../utils/secureStore/secureStore"
import ChatroomCard from "../../components/ChatroomCard"
import { PublicStackParamList } from "../../navigation/Public/PublicScreensNavigator"
import { fetchChatroomList } from "../../services/chatApi"

import styles from "./ChattingScreen.styles"
type Prop = {}

type ChattingScreenProp = StackNavigationProp<PublicStackParamList, "ChattingScreens">

const ChattingScreen = (props: Prop) => {
  const navigation = useNavigation<ChattingScreenProp>()
  const [chatroomList, setChatroomList] = useState<
    {
      receiver: string
      orderId: number
      chattingRoomId: number
    }[]
  >([])

  const loadChatroomList = async () => {
    const jwt = await getTokenAsync()
    if (!jwt) return

    const roomList = await fetchChatroomList(jwt)
    if (!roomList) return

    setChatroomList(roomList)
  }

  useEffect(() => {
    loadChatroomList()
  }, [])

  const renderItem = ({
    item,
  }: {
    item: {
      receiver: string
      orderId: number
      chattingRoomId: number
    }
  }) => {
    return (
      <ChatroomCard
        onPress={() =>
          navigation.navigate("ChattingScreens", { postId: item.orderId, chattingRoomId: item.chattingRoomId})
        }
        sender={item.receiver}
      />
    )
  }

  return (
    <View style={styles.container}>
      <FlatList data={chatroomList} renderItem={renderItem} />
    </View>
  )
}

export default ChattingScreen
