import { View, Text, Pressable, Keyboard } from "react-native"
import { useState } from "react"
import { StackScreenProps } from "@react-navigation/stack"

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

type Props = StackScreenProps<OnboardingParamList>

const FindPasswordScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")
  const [authCode, setAuthCode] = useState("")
  const [authCodeError, setAuthCodeError] = useState("")

  const [didSubmitAuthCode, setDidSubmitAuthCode] = useState(false)
  const [authCodeCorrect, setAuthCodeCorrect] = useState(false)

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
    navigation.navigate("ChangePassword")
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
            onPress={() => null}
            variant="smallButton"
          />
        </View>
        <FormInputError>{emailError}</FormInputError>
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
            onPress={() => null}
            variant="smallButton"
          />
        </View>
        <FormInputError>{authCodeError}</FormInputError>
      </View>
      <Button
        title="비밀번호 변경하러 가기"
        onPress={handleGoToChangePasswordPressed}
        style={styles.changePasswordButton}
      />
    </Pressable>
  )
}

export default FindPasswordScreen
