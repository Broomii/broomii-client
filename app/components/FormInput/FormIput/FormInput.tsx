import { View, Text, TextInput } from "react-native"
import styles from "./FormInput.styles"

type Props = {
  placeholder: string
  value: string
  onChangeText: (text: string) => void
}

const FormInput = ({ placeholder, value, onChangeText }: Props) => {
  return (
    <View style={styles.formInputContainer}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
      />
    </View>
  )
}

export default FormInput
