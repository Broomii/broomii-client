import { View, Text, TextInput } from "react-native"
import styles from "./EmailFormInput.styles"

type Props = {
  placeholder: string
  value: string
  onChangeText: (text: string) => void
}

const EmailFormInput = ({ placeholder, value, onChangeText }: Props) => {
  return (
    <View style={styles.emailFormInputContainer}>
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
