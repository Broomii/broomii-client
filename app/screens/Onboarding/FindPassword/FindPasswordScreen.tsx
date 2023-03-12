import { View, Text, Pressable, Keyboard } from "react-native"
import { useState, useContext } from "react"
import { StackScreenProps } from "@react-navigation/stack"
import axios from "axios"

import {
  FormInputLabel,
  FormInput,
  EmailFormInput,
  FormInputError,
} from "../../../components/FormInput"
import { Button } from "../../../components/Button"

import styles from "./findPasswordScreen.styles"
import Layout from "../../../style/layout/Layout"
import {
  checkFormEmpty,
  checkInfoSubmit,
  checkInfoCorrect,
} from "../../../utils/onboarding/checkForm"

import { OnboardingParamList } from "../../../navigation/Onboarding/OnboardingScreensNavigator"
import { AuthContext } from "../../../context/AuthContext"

import { BASE_URL } from "../../../config"
import { styleKit } from "../../../style"

type Props = StackScreenProps<OnboardingParamList>

const FindPasswordScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState("")
  const [capturedEmail, setCapturedEmail] = useState("")
  const [emailError, setEmailError] = useState("")
  const [authCode, setAuthCode] = useState("")
  const [authCodeError, setAuthCodeError] = useState("")
  // const [checkingAuthCode, setCheckingAuthCode] = useState(false)

  const [didSubmitAuthCode, setDidSubmitAuthCode] = useState(false)
  const [authCodeCorrect, setAuthCodeCorrect] = useState(false)

  const handleSendAuthCodePressed = () => {
    axios
      .post(`${BASE_URL}/mail/sendCertificationNumber`, {
        email,
      })
      .then((res) => {
        const message = res.data.message
        console.log(message)
        setEmailError("이메일로 인증번호를 전송하였습니다")
        setCapturedEmail(email)
      })
      .catch((e) => {
        console.log(`Error: Checking Email at server failed, Reason: ${e}`)
      })
  }

  const handleAuthCodeConfirmPressed = () => {
    console.log(authCode)

    if (capturedEmail.trim() === "") {
      setEmailError("다시 이메일로 인증번호를 전송하세요")
      return
    }

    axios
      .post(`${BASE_URL}/members/confirmCertification`, {
        email: capturedEmail,
        certification: authCode,
      })
      .then((res) => {
        console.log(res.data)
        setAuthCodeCorrect(true)
        setAuthCodeError("인증번호 확인을 완료하였습니다")
      })
      .catch((e) => {
        console.log(`Error Sending Auth Code - Reason: ${e}`)
        setAuthCodeError("인증번호 확인에 실패하였습니다")
      })
      .finally(() => {
        setDidSubmitAuthCode(true)
      })
  }

  const handleGoToChangePasswordPressed = (): void => {
    let isEmailCorrect: boolean = false
    let isAuthCodeCorrect: boolean = false

    // Check Email, Auth Code
    isEmailCorrect = !checkFormEmpty(
      email,
      setEmailError,
      "이메일을 입력하세요",
    )

    isAuthCodeCorrect =
      !checkFormEmpty(authCode, setAuthCodeError, "인증코드를 입력하세요") &&
      checkInfoSubmit(
        didSubmitAuthCode,
        setAuthCodeError,
        "인증이 완료되지 않았습니다",
      ) &&
      checkInfoCorrect(
        authCodeCorrect,
        setAuthCodeError,
        "인증번호가 일치하지 않습니다",
      )

    // if (fetched api returns true && isCorrect && )
    if (isEmailCorrect && isAuthCodeCorrect) {
      navigation.navigate("ChangePassword", { email })
    }
  }

  return (
    <Pressable
      style={[Layout.containerWithPadding, styles.findPasswordScreenContainer]}
      onPress={Keyboard.dismiss}
    >
      <View style={styles.findPasswordInputFormContainer}>
        <FormInputLabel style={styles.findPasswordInputLabel}>
          이메일
        </FormInputLabel>
        <View style={styles.buttonSection}>
          <EmailFormInput
            placeholder="아이디를 입력하세요"
            value={email}
            onChangeText={(newEmail) => {
              setEmail(newEmail)
            }}
            style={{ flex: 1 }}
          />
          <Button
            title="인증번호 전송"
            onPress={handleSendAuthCodePressed}
            variant="smallButton"
          />
        </View>
        <FormInputError
          style={
            emailError === "이메일로 인증번호를 전송하였습니다"
              ? { color: styleKit.colors.primary }
              : {}
          }
        >
          {emailError}
        </FormInputError>
      </View>
      <View style={styles.findPasswordInputFormContainer}>
        <FormInputLabel>인증번호</FormInputLabel>
        <View style={styles.buttonSection}>
          <FormInput
            placeholder="인증번호를 입력하세요"
            value={authCode}
            onChangeText={(newAuthCode) => {
              setAuthCode(newAuthCode)
            }}
            keyboardType="numeric"
            style={{ flex: 1 }}
          />
          <Button
            title="인증번호 확인"
            onPress={handleAuthCodeConfirmPressed}
            variant="smallButton"
          />
        </View>
        <FormInputError
          style={
            authCodeError === "인증번호 확인을 완료하였습니다"
              ? { color: styleKit.colors.primary }
              : {}
          }
        >
          {authCodeError}
        </FormInputError>
      </View>
      <Button
        title="비밀번호 변경하러 가기"
        onPress={handleGoToChangePasswordPressed}
        style={
          authCodeCorrect
            ? styles.changePasswordButtonEnabled
            : styles.changePasswordButtonDisabled
        }
        disabled={!authCodeCorrect}
      />
    </Pressable>
  )
}

export default FindPasswordScreen
