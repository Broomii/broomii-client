import { View, Text, TextInput, ViewStyle } from "react-native"
import { forwardRef } from "react"
import styles from "./FormInput.styles"

type Props = {
  placeholder: string
  value: string
  onChangeText: (text: string) => void
  secureTextEntry?: boolean
  keyboardType?: "default" | "numeric"
  onSubmitEditing?: () => void
  autoComplete?: "password" | "sms-otp" | "off"
  style?: ViewStyle
}

const FormInput = forwardRef<TextInput, Props>(
  (
    {
      placeholder,
      value,
      onChangeText,
      secureTextEntry,
      keyboardType,
      style,
      onSubmitEditing,
      autoComplete = "off",
    },
    ref,
  ) => {
    return (
      <View style={{ ...styles.formInputContainer, ...style }}>
        <TextInput
          style={styles.formInputInnerContainer}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          ref={ref}
          onSubmitEditing={onSubmitEditing}
          autoComplete={autoComplete}
          autoCapitalize="none"
        />
      </View>
    )
  },
)

export default FormInput
