import { View, Text, Image, Pressable, Keyboard } from "react-native"
import { useState } from "react"
import styles from "./LoginScreen.styles"
import { StackScreenProps } from "@react-navigation/stack"

import { Button, TextButton } from "../../../components/Button"
import {
  FormInput,
  FormInputLabel,
  FormInputError,
  EmailFormInput,
} from "../../../components/FormInput"
import { Font } from "../../../style/font"
import Layout from "../../../style/layout"
import { checkFormEmpty } from "../../../utils/onboarding/checkForm"

import { OnboardingParamList } from "../../../navigation/Onboarding/OnboardingScreensNavigator"

type Props = StackScreenProps<OnboardingParamList>

const LoginScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")

  return (
    <Pressable
      style={{ ...Layout.containerWithPadding, ...styles.loginScreenContainer }}
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
        <EmailFormInput
          value={email}
          onChangeText={(newEmail) => {
            setEmail(newEmail)
          }}
          placeholder="아이디를 입력하세요"
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
            setPassword(newPassword)
          }}
          placeholder="비밀번호를 입력하세요"
          secureTextEntry={true}
        />
        <FormInputError>{passwordError}</FormInputError>
      </View>
      <Button
        style={styles.loginButton}
        title="로그인"
        onPress={() => {
          checkFormEmpty(email, setEmailError, "아이디를 입력하세요")
          checkFormEmpty(password, setPasswordError, "비밀번호를 입력하세요")
        }}
      />
      <View style={styles.forgotPasswordContainer}>
        <TextButton
          containerStyle={styles.forgotPasswordButton}
          title="비밀번호 찾기"
          onPress={() => navigation.navigate("FindPassword")}
        />
        <TextButton
          containerStyle={styles.forgotPasswordButton}
          title="회원가입"
          onPress={() => navigation.navigate("SignUp")}
        />
      </View>
    </Pressable>
  )
}

export default LoginScreen
