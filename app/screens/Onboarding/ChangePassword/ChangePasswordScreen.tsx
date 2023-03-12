import { View, Text, Pressable, Keyboard } from "react-native"
import { useState } from "react"
import { StackNavigationProp } from "@react-navigation/stack"
import { useNavigation, RouteProp } from "@react-navigation/native"
import axios from "axios"

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
import { BASE_URL } from "../../../config"

type NavigationProps = StackNavigationProp<
  OnboardingParamList,
  "ChangePassword"
>

type ChangePasswordProps = {
  route: RouteProp<{ params: { email: string | null } }, "params">
}

const ChangePasswordScreen = ({ route }: ChangePasswordProps) => {
  const navigation = useNavigation<NavigationProps>()

  const { email } = route.params
  console.log(email)
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [passwordConfirmError, setPasswordConfirmError] = useState("")

  const sendChangePasswordRequest = async () => {
    let body

    if (email === null) {
      body = {
        password,
      }
    } else {
      body = {
        email,
        password,
      }
    }

    return axios.post(`${BASE_URL}/members/editPassword`, body)
  }

  const handleGoToLoginPressed = (): void => {
    let isPasswordCorrect: boolean = false
    let isPasswordConfirmCorrect: boolean = false

    // Check Password, Password Confirm
    isPasswordCorrect =
      !checkFormEmpty(password, setPasswordError, "비밀번호를 입력하세요") &&
      !checkFormEmpty(
        passwordConfirm,
        setPasswordConfirmError,
        "비밀번호 확인을 입력하세요",
      ) &&
      checkPasswordSame(password, passwordConfirm, setPasswordConfirmError)

    // if alright
    if (isPasswordCorrect) {
      sendChangePasswordRequest()
        .then((res) => {
          console.log(res.data)
          navigation.navigate("Login")
        })
        .catch((e) => console.log(e))
    }
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
