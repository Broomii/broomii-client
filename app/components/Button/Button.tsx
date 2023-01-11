import { View, Text, Pressable, ViewStyle } from "react-native"
import styles from "./Button.styles"

type Props = {
  onPress: () => void
  title: string
  style?: ViewStyle
}

const Button = ({ onPress, title, style }: Props) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.buttonContainer,
        style,
        pressed ? { opacity: 0.9 } : {},
      ]}
      onPress={onPress}
    >
      <Text style={styles.buttonTitle}>{title}</Text>
    </Pressable>
  )
}

export default Button
