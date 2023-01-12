import { View, Text, TextInput, ViewStyle } from "react-native"
import styles from "./FormInput.styles"

type Props = {
  placeholder: string
  value: string
  onChangeText: (text: string) => void
  secureTextEntry?: boolean,
  style?: ViewStyle
}

const FormInput = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  style
}: Props) => {
  return (
    <View style={{...styles.formInputContainer, ...style}}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
      />
    </View>
  )
}

export default FormInput
