import { View, Text, Image, Pressable, Keyboard } from "react-native"
import { useState } from "react"
import styles from "./LoginScreen.styles"

import { FormInput, FormInputLabel, FormInputError } from "../../../components/FormInput"
import { Button, TextButton } from "../../../components/Button"
import Layout from "../../../style/layout"

const LoginScreen = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")

  return (
    <Pressable
      style={{ ...Layout.containerWithPadding, ...styles.contentContainer }}
      onPress={Keyboard.dismiss}
    >
      <Image
        style={styles.logo}
        source={require("../../../../assets/images/logo.png")}
      />
      <View style={styles.loginFormInputContainer}>
        <FormInputLabel style={styles.loginFormInputLabel}>
          이메일
        </FormInputLabel>
        <FormInput
          value={email}
          onChangeText={(newEmail) => {
            setEmail(newEmail)
          }}
          placeholder="이메일을 입력하세요"
        />
        <FormInputError>{emailError}</FormInputError>
      </View>
      <View style={styles.loginFormInputContainer}>
        <FormInputLabel style={styles.loginFormInputLabel}>
          비밀번호
        </FormInputLabel>
        <FormInput
          value={password}
          onChangeText={(newPassword) => {
            setEmail(newPassword)
          }}
          placeholder="비밀번호를 입력하세요"
        />
        <FormInputError>{passwordError}</FormInputError>
      </View>
      <Button
        style={styles.loginButton}
        title="로그인"
        onPress={() => {
          if (email.trim() === "") {
            setEmailError("이메일을 입력하세요")
          } else {
            setEmailError("")
          }
          if (password.trim() === "") {
            setPasswordError("비밀번호를 입력하세요")
          } else {
            setPasswordError("")
          }
        }}
      />
      <View style={styles.forgotPasswordContainer}>
        <TextButton
          containerStyle={styles.forgotPasswordButton}
          title="비밀번호 찾기"
          onPress={() => null}
        />
        <TextButton
          containerStyle={styles.forgotPasswordButton}
          title="회원가입"
          onPress={() => null}
        />
      </View>
    </Pressable>
  )
}

export default LoginScreen
