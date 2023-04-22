import { View, Text, Keyboard, Animated, Easing } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import React, { useState, useCallback, useEffect, useRef } from "react"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import {
  GiftedChat,
  Bubble,
  Send,
  InputToolbar,
  Composer,
  IMessage,
  ComposerProps,
  SendProps,
  BubbleProps,
  InputToolbarProps,
  Avatar,
} from "react-native-gifted-chat"
import { Ionicons, FontAwesome } from "@expo/vector-icons"
import { RouteProp } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"

import { isAOS } from "../../../utils/platform"
import { Button } from "../../../components/Button"
import Card from "../../../components/Card"

import { styleKit } from "../../../style"
import { spacing } from "../../../constant/Layout"

import { ChattingStackParamList } from "../../../navigation/Public/ChattingScreens/ChattingScreens"

import { SOCKET_URL } from "../../../config"

import { renderBubble, renderSend, renderComposer } from "./components/ChatUI"
import { getToken } from "../../../utils/secureStore/secureStore"
import {
  fetchChatroomId,
  fetchChattingHistory,
  connect,
  disconnect,
  sendMessage,
  createChatroom,
} from "../../../services/chatApi"
import { fetchMyProfile } from "../../../services/settingsApi"
import { fetchSinglePost } from "../../../services/postApi"
import { PostType } from "../../../redux/Post/postSlice"

type ChatroomScreenRouteProp = RouteProp<ChattingStackParamList, "Chatroom">
type ChattingScreensNavigationProp = StackNavigationProp<
  ChattingStackParamList,
  "Chatroom"
>

type ChatroomScreenProps = {
  route: ChatroomScreenRouteProp
  navigation: ChattingScreensNavigationProp
}

const ChatroomScreen = ({ route, navigation }: ChatroomScreenProps) => {
  const BOTTOM_INSET = useSafeAreaInsets().bottom
  const [messages, setMessages] = useState<IMessage[]>([])
  const [isKeyboardVisible, setKeyboardVisible] = useState(false)
  const [chatroomId, setChatroomId] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [token, setToken] = useState("")
  const [myUsername, setMyUsername] = useState("")
  const anim = useRef(new Animated.Value(isKeyboardVisible ? 20 : 45)).current
  const { params } = route
  const { postId } = params
  const [post, setPost] = useState<PostType | null>(null)
  const [joiningMessage, setJoiningMessage] = useState("")

  const ws = useRef<WebSocket | null>(null)
  const scrollRef = useRef<GiftedChat>(null)
  const chatroomIdRef = useRef<number | null>(null)


  const startNewChat = (msg: string) => {
    // createChatRoom
    getToken().then((tok) => {
      if (tok) {
        createChatroom(postId, tok).then((_chatroomId) => {
          if (_chatroomId) {
            setJoiningMessage(msg)
            chatroomIdRef.current = _chatroomId
          }
        })
      }
    })
    // send message
  }

  useEffect(() => {
    if (joiningMessage !== "") {
      setChatroomId(chatroomIdRef.current)
    }
  }, [joiningMessage])


  const loadChatHistory = (roomId: number) => {
    fetchChattingHistory(roomId, token).then((history) => {
      if (!history) return
      setMessages(history)
    })
  }

  useEffect(() => {
    navigation.setOptions({ title: post?.nickName })
  }, [post])

  useEffect(() => {
    getToken().then((tok) => {
      if (tok) {
        fetchSinglePost({ id: postId, jwt: tok }).then((_post) => {
          setPost(_post)
        })
      }
    })
  }, [])

  useEffect(() => {
    setTimeout(() => {
      scrollRef.current?.scrollToBottom(true)
    }, 1000)
  }, [messages])

  useEffect(() => {
    if (chatroomId) {
      connect(ws, chatroomId, setMessages, joiningMessage)
      return () => {
        disconnect(ws)
      }
    }
  }, [chatroomId])

  useEffect(() => {
    setIsLoading(true)
    getToken()
      .then((jwt) => {
        if (jwt) {
          setToken(jwt)
          fetchChatroomId(postId, jwt as string).then((roomId) => {
            if (!roomId) {
              console.log("no room!!")
              setChatroomId(null)
            } else {
              console.log("roomid o: " + roomId)
              setChatroomId(roomId)
              fetchMyProfile(jwt).then((data) => {
                if (data) {
                  setMyUsername(data.nickName)
                  loadChatHistory(roomId)
                }
              })
            }
          })
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true) // or some other action
      },
    )
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false) // or some other action
      },
    )

    return () => {
      keyboardDidHideListener.remove()
      keyboardDidShowListener.remove()
    }
  }, [])

  useEffect(() => {
    Animated.timing(anim, {
      toValue: isKeyboardVisible ? 5 : 45,
      duration: 200,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start()
  }, [isKeyboardVisible, anim])

  const onSend = useCallback(
    (messages: IMessage[] = []) => {
      if (chatroomId) {
        sendMessage(ws, messages[0].text, chatroomId, "TALK")
      } else {
        // Start Chat
        startNewChat(messages[0].text)
      }
    },
    [chatroomId],
  )

  const renderInputToolbar = (
    inputToolbarProps: InputToolbarProps<IMessage>,
  ) => {
    return (
      <InputToolbar
        {...inputToolbarProps}
        containerStyle={{
          backgroundColor: styleKit.colors.primaryInvert,
          marginBottom: BOTTOM_INSET,
          height: 50,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      />
    )
  }
  const renderChatFooter = () => {
    return (
      <Animated.View
        style={{
          height: isAOS
            ? styleKit.spacing.sm
            : anim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
        }}
      />
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <Card
        title={post ? post.title : ""}
        location={post ? post.deliveryAddress : ""}
        price={post ? post.deliveryPay : 0}
        stateButton={post ? post.flag === 1 : false}
      />
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: myUsername,
        }}
        renderBubble={renderBubble}
        renderSend={renderSend}
        renderInputToolbar={renderInputToolbar}
        renderComposer={renderComposer}
        wrapInSafeArea={false}
        renderChatFooter={renderChatFooter}
        inverted={false}
        messagesContainerStyle={{ paddingTop: styleKit.spacing.md }}
        renderAvatar={null}
        showUserAvatar={false}
        showAvatarForEveryMessage={false}
        ref={scrollRef}
      />
      {isAOS ? null : <View style={{ marginBottom: styleKit.spacing.sm }} />}
    </View>
  )
}

export default ChatroomScreen
