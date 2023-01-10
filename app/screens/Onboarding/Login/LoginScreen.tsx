import { View, Text, Image } from "react-native"
import React from "react"
import styles from "./loginScreen.styles"

import { FormInput, FormInputLabel } from "../../../components/FormInput"
import { Button, TextButton } from "../../../components/Button"
import { useNavigation } from "@react-navigation/native"

const LoginScreen = () => {
  const navigtaion = useNavigation();

  return (
    <View>
      <Image
        style={styles.logo}
        source={require("../../../../assets/images/logo.png")}
      />
      <FormInputLabel>text</FormInputLabel>
      <FormInput placeholder="플레이스 홀더" />
      <Button title="btn" onPress={() => {}}/>
      <View>
        <TextButton />
        <TextButton />
      </View>
      {/* container(signup, findpw) */}
    </View>
  )
}

export default LoginScreen
