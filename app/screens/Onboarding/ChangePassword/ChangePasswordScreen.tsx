import { View, Text, Pressable, Keyboard } from "react-native"
import { useState } from "react"
import { StackScreenProps } from "@react-navigation/stack"

import {
  FormInputLabel,
  FormInput,
  FormInputError,
} from "../../../components/FormInput"
import { Button } from "../../../components/Button"

import Layout from "../../../style/layout/Layout"
import styles from "./changePasswordScreen.styles"

import {
  checkFormEmpty,
  checkPasswordSame,
} from "../../../utils/onboarding/checkForm"

import { OnboardingParamList } from "../../../navigation/Onboarding/OnboardingScreensNavigator"

type Props = StackScreenProps<OnboardingParamList>

const ChangePasswordScreen = ({ navigation }: Props) => {
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [passwordConfirmError, setPasswordConfirmError] = useState("")

  const handleGoToLoginPressed = (): void => {
    let isPasswordCorrect: boolean = false
    let isPasswordConfirmCorrect: boolean = false

    // Check Password, Password Confirm
    isPasswordCorrect = checkFormEmpty(
      password,
      setPasswordError,
      "비밀번호를 입력하세요",
    )
    !checkFormEmpty(
      passwordConfirm,
      setPasswordConfirmError,
      "비밀번호 확인을 입력하세요",
    ) && checkPasswordSame(password, passwordConfirm, setPasswordConfirmError)

    // if alright
    navigation.navigate("Login")
  }
  return (
    <Pressable
      style={[
        Layout.containerWithPadding,
        styles.changePasswordScreenContainer,
      ]}
      onPress={Keyboard.dismiss}
    >
      <View style={styles.changePasswordInputFormContainer}>
        <FormInputLabel style={styles.changePasswordInputLabel}>
          비밀번호
        </FormInputLabel>

        <FormInput
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChangeText={(newPassword) => {
            setPassword(newPassword)
          }}
          secureTextEntry={true}
        />
        <FormInputError>{passwordError}</FormInputError>
      </View>
      <View style={styles.changePasswordInputFormContainer}>
        <FormInputLabel style={styles.changePasswordInputLabel}>
          비밀번호 확인
        </FormInputLabel>

        <FormInput
          placeholder="비밀번호를 입력하세요"
          value={passwordConfirm}
          onChangeText={(newPasswordConfirm) => {
            setPasswordConfirm(newPasswordConfirm)
          }}
          secureTextEntry={true}
        />
        <FormInputError>{passwordConfirmError}</FormInputError>
      </View>
      <Button
        title="로그인하러 가기"
        onPress={handleGoToLoginPressed}
        style={styles.goToLoginButton}
      />
    </Pressable>
  )
}

export default ChangePasswordScreen
