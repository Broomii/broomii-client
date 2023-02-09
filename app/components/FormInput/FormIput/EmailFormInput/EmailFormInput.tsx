import { forwardRef } from "react"
import { View, Text, TextInput, ViewStyle } from "react-native"

import styles from "./EmailFormInput.styles"

type Props = {
  placeholder: string
  value: string
  onChangeText: (text: string) => void
  style?: ViewStyle
}

const EmailFormInput = forwardRef<TextInput, Props>(
  ({ placeholder, value, onChangeText, style }: Props, ref) => {
    return (
      <View style={{ ...styles.emailFormInputContainer, ...style }}>
        <TextInput
          style={styles.emailFormInnerContainer}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          ref={ref}
          autoCapitalize="none"
        />
        <Text style={styles.emailSuffix}>@sch.ac.kr</Text>
      </View>
    )
  },
)

export default EmailFormInput
