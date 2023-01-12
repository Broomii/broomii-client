import { View, Text, TextInput, ViewStyle } from "react-native"
import styles from "./EmailFormInput.styles"

type Props = {
  placeholder: string
  value: string
  onChangeText: (text: string) => void
  style?: ViewStyle
}

const EmailFormInput = ({ placeholder, value, onChangeText, style }: Props) => {
  return (
    <View style={{ ...styles.emailFormInputContainer, ...style }}>
      <TextInput
        style={styles.emailFormInnerContainer}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
      />
      <Text style={styles.emailSuffix}>@sch.ac.kr</Text>
    </View>
  )
}

export default EmailFormInput
