import {
  Bubble,
  BubbleProps,
  IMessage,
  Send,
  SendProps,
  InputToolbar,
  InputToolbarProps,
  Composer,
  ComposerProps,
} from "react-native-gifted-chat"
import { styleKit } from "../../../../style"
import { isAOS } from "../../../../utils/platform"

export const renderBubble = (props: BubbleProps<IMessage>) => {
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

export const renderSend = (sendProps: SendProps<IMessage>) => {
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



export const renderComposer = (composerProps: ComposerProps) => {
  return (
    <Composer
      {...composerProps}
      placeholder="메시지를 입력하세요..."
      textInputStyle={{ lineHeight: 22 }}
    />
  )
}
