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
} from "react-native-gifted-chat"
import { Ionicons, FontAwesome } from "@expo/vector-icons"

import { isAOS } from "../../../utils/platform"
import { Button } from "../../../components/Button"
import Card from "../../../components/Card"

import { styleKit } from "../../../style"
import { spacing } from "../../../constant/Layout"

type Props = {}

const ChatroomScreen = (props: Props) => {
  const BOTTOM_INSET = useSafeAreaInsets().bottom
  const [messages, setMessages] = useState([{}])
  const [isKeyboardVisible, setKeyboardVisible] = useState(false)
  const anim = useRef(new Animated.Value(isKeyboardVisible ? 20 : 45)).current

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

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
    )
  }, [])

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: styleKit.colors.brand,
          },
        }}
      />
    )
  }

  const renderSend = (sendProps) => {
    return (
      <Send
        {...sendProps}
        textStyle={{
          color: styleKit.colors.primaryInvert,
          lineHeight: isAOS ? 42 : 37,
          fontFamily: styleKit.font.FontWeight.Bold,
          marginLeft: isAOS ? 9 : 10,
        }}
        containerStyle={{
          backgroundColor: styleKit.colors.brand,
          borderRadius: 18,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: 37,
          height: 37,
          marginRight: styleKit.spacing.sm,
          marginBottom: 2,
        }}
        label={"↑"}
      />
    )
  }

  const renderInputToolbar = (inputToolbarProps) => {
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

  const renderComposer = (composerProps) => {
    return (
      <Composer
        {...composerProps}
        placeholder="메시지를 입력하세요..."
        textInputStyle={{ lineHeight: 22 }}
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
      <Card stateButton={true} />
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
        renderBubble={renderBubble}
        renderSend={renderSend}
        renderInputToolbar={renderInputToolbar}
        renderComposer={renderComposer}
        wrapInSafeArea={false}
        renderChatFooter={renderChatFooter}
      />
      {isAOS ? null : <View style={{ marginBottom: styleKit.spacing.sm }} />}
    </View>
  )
}

export default ChatroomScreen
