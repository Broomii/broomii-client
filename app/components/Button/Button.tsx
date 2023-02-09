import {
  View,
  Pressable,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from "react-native"
import styles from "./Button.styles"

import Text from "../Text"

type Props = {
  onPress: () => void
  title: string
  style?: ViewStyle
  variant?: "default" | "smallButton"
  isLoading?: boolean
}

type buttonStylesType = {
  default: {
    container: ViewStyle
    title: TextStyle
  }
  smallButton: {
    container: ViewStyle
    title: TextStyle
  }
}

const Button = ({
  onPress,
  title,
  style,
  variant = "default",
  isLoading = false,
}: Props) => {
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
      {isLoading ? (
        <ActivityIndicator size={"small"} color="white" />
      ) : (
        <Text style={buttonStyles[variant].title}>{title}</Text>
      )}
    </Pressable>
  )
}

export default Button
