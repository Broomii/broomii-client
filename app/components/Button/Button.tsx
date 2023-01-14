import { View, Text, Pressable, ViewStyle, TextStyle } from "react-native"
import styles from "./Button.styles"

import colors from "../../style/colors"
import { Font } from "../../style/font"

type Props = {
  onPress: () => void
  title: string
  style?: ViewStyle
  variant?: "default" | "smallButton"
}

type buttonStylesType = {
  default: {
    container: ViewStyle
    title: TextStyle
  },
  smallButton: {
    container: ViewStyle
    title: TextStyle
  }
}

const Button = ({ onPress, title, style, variant = "default" }: Props) => {
  const buttonStyles: buttonStylesType = {
    default: {
      container: styles.defaultButtonContainer,
      title: styles.defaultButtonTitle,
    },
    smallButton: {
      container: styles.smallButtonContainer,
      title: styles.smallButtonTitle,
    },
  }

  return (
    <Pressable
      style={({ pressed }) => [
        buttonStyles[variant].container,
        style,
        pressed ? { opacity: 0.9 } : {},
      ]}
      onPress={onPress}
    >
      <Text style={buttonStyles[variant].title}>{title}</Text>
    </Pressable>
  )
}

export default Button
