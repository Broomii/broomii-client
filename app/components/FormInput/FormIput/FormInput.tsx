import { View, Text, TextInput } from "react-native"
import styles from "./FormInput.styles"

type Props = {
  placeholder: string
  value: string
  onChangeText: (text: string) => void
  secureTextEntry?: boolean
}

const FormInput = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
}: Props) => {
  return (
    <View style={styles.formInputContainer}>
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
