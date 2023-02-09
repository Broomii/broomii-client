import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  GestureResponderEvent,
} from "react-native"
import React, { useState, createRef, RefObject } from "react"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useHeaderHeight } from "@react-navigation/elements"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

import { isAOS } from "../../../utils/platform"
import {
  FormInput,
  FormInputLabel,
  FormInputError,
  EmailFormInput,
} from "../../../components/FormInput"
import { Button } from "../../../components/Button"
import { CheckBox as SexRadioButton } from "@rneui/themed"

import styles from "./SignUpScreen.styles"
import Layout from "../../../style/layout"
import {
  checkFormEmpty,
  checkInfoSubmit,
  checkInfoCorrect,
  checkPasswordSame,
} from "../../../utils/onboarding/checkForm"
import { styleKit } from "../../../style"

type Props = {}

const SignUpScreen = (props: Props) => {
  const insets = useSafeAreaInsets()
  const headerHeight = useHeaderHeight()

  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")
  const [authCode, setAuthCode] = useState("")
  const [authCodeError, setAuthCodeError] = useState("")
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [passwordConfirmError, setPasswordConfirmError] = useState("")
  const [address, setAddress] = useState("")
  const [addressError, setAddressError] = useState("")
  const [name, setName] = useState("")
  const [nameError, setNameError] = useState("")
  const [userName, setUserName] = useState("")
  const [userNameError, setUserNameError] = useState("")
  const [major, setMajor] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [phoneNumberError, setPhoneNumberError] = useState("")
  const [male, setMale] = useState(false)
  const [female, setFemale] = useState(false)

  const [didSubmitAuthCode, setDidSubmitAuthCode] = useState(false)
  const [authCodeCorrect, setAuthCodeCorrect] = useState(false)
  const [didSubmitUserName, setDidSubmitUserName] = useState(false)
  const [userNameDuplicate, setUserNameDuplicate] = useState(false)
  const [passwordSame, setPasswordSame] = useState(false)

  const emailRef = createRef<TextInput>()
  const authCodeRef = createRef<TextInput>()
  const passwordRef = createRef<TextInput>()
  const passwordConfirmRef = createRef<TextInput>()
  const addressRef = createRef<TextInput>()
  const nameRef = createRef<TextInput>()
  const userNameRef = createRef<TextInput>()

  const focus = (ref: RefObject<TextInput>): void => {
    ref.current?.focus()
  }

  const onMaleButtonPressed = (): void => {
    setMale(true)
    setFemale(false)
  }
  const onFemaleButtonPressed = (): void => {
    setMale(false)
    setFemale(true)
  }

  const handleSignUpButtonPressed = (): void => {
    let isEmailCorrect: boolean = false
    let isAuthCodeCorrect: boolean = false
    let isPasswordCorrect: boolean = false
    // let isPasswordConfirmCorrect: boolean = false
    let isAddressCorrect: boolean = false
    let isNameCorrect: boolean = false
    let isUserNameCorrect: boolean = false

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

    // Check Address
    isAddressCorrect = checkFormEmpty(
      address,
      setAddressError,
      "기본 배달 주소를 입력하세요",
    )

    // Check Name
    isNameCorrect = checkFormEmpty(name, setNameError, "이름을 입력하세요")

    // Check Username
    isUserNameCorrect =
      !checkFormEmpty(userName, setUserNameError, "닉네임을 입력하세요") &&
      checkInfoSubmit(
        didSubmitUserName,
        setUserNameError,
        "중복확인을 해주세요",
      ) &&
      checkInfoCorrect(
        userNameDuplicate,
        setUserNameError,
        "중복된 닉네임입니다",
      )

    !isUserNameCorrect && focus(userNameRef)
    !isNameCorrect && focus(nameRef)
    !isAddressCorrect && focus(addressRef)
    // !isPasswordConfirmCorrect && focus(passwordConfirmRef)
    !isPasswordCorrect && focus(passwordRef)
    !isAuthCodeCorrect && focus(authCodeRef)
    !isEmailCorrect && focus(emailRef)
  }

  // onpress auth code send
  // onpress auth code check
  // onpress user name check

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
      keyboardVerticalOffset={headerHeight - 30}
    >
      <ScrollView
        style={{
          ...Layout.containerWithPadding,
          ...styles.signUpScreenContainer,
        }}
        contentContainerStyle={{
          paddingBottom: insets.bottom + 10,
          paddingTop: 16,
        }}
      >
        {/* Email Form */}
        <View style={styles.signUpFormInputContainer}>
          <FormInputLabel style={styles.signUpFormInputLabel}>
            *이메일
          </FormInputLabel>
          <View style={styles.signUpFormButtonSection}>
            <EmailFormInput
              value={email}
              onChangeText={(newEmail) => {
                setEmail(newEmail)
              }}
              placeholder="아이디를 입력하세요"
              ref={emailRef}
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
        {/* Auth Number Form */}
        <View style={styles.signUpFormInputContainer}>
          <FormInputLabel style={styles.signUpFormInputLabel}>
            *인증번호
          </FormInputLabel>
          <View style={styles.signUpFormButtonSection}>
            <FormInput
              value={authCode}
              onChangeText={(newAuthCode) => {
                setAuthCode(newAuthCode)
              }}
              placeholder="인증번호를 입력하세요"
              keyboardType="numeric"
              ref={authCodeRef}
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
        {/* Password Form */}
        <View style={styles.signUpFormInputContainer}>
          <FormInputLabel style={styles.signUpFormInputLabel}>
            *비밀번호
          </FormInputLabel>
          <FormInput
            value={password}
            onChangeText={(newPassword) => {
              setPassword(newPassword)
            }}
            placeholder="비밀번호를 입력하세요"
            secureTextEntry={true}
            ref={passwordRef}
          />
          <FormInputError>{passwordError}</FormInputError>
        </View>
        {/* Password Check Form */}
        <View style={styles.signUpFormInputContainer}>
          <FormInputLabel style={styles.signUpFormInputLabel}>
            *비밀번호 확인
          </FormInputLabel>
          <FormInput
            value={passwordConfirm}
            onChangeText={(newPasswordConfirm) => {
              setPasswordConfirm(newPasswordConfirm)
            }}
            placeholder="비밀번호를 입력하세요"
            secureTextEntry={true}
            ref={passwordConfirmRef}
          />
          <FormInputError>{passwordConfirmError}</FormInputError>
        </View>
        {/* Delivery address Form */}
        <View style={styles.signUpFormInputContainer}>
          <FormInputLabel style={styles.signUpFormInputLabel}>
            *기본 배달 주소
          </FormInputLabel>
          <FormInput
            value={address}
            onChangeText={(newAddress) => {
              setAddress(newAddress)
            }}
            placeholder="기본값으로 설정할 배달 주소를 입력하세요"
            ref={addressRef}
          />
          <FormInputError>{addressError}</FormInputError>
        </View>
        {/* Name Form */}
        <View style={styles.signUpFormInputContainer}>
          <FormInputLabel style={styles.signUpFormInputLabel}>
            *이름
          </FormInputLabel>
          <FormInput
            value={name}
            onChangeText={(newName) => {
              setName(newName)
            }}
            placeholder="이름을 입력하세요"
            ref={nameRef}
          />
          <FormInputError>{nameError}</FormInputError>
        </View>
        {/* User Name Form */}
        <View style={styles.signUpFormInputContainer}>
          <FormInputLabel style={styles.signUpFormInputLabel}>
            *닉네임
          </FormInputLabel>
          <View style={styles.signUpFormButtonSection}>
            <FormInput
              value={userName}
              onChangeText={(newUserName) => {
                setUserName(newUserName)
              }}
              placeholder="닉네임을 입력하세요"
              ref={userNameRef}
              style={{ flex: 1 }}
            />
            <Button
              title="중복 확인"
              onPress={() => null}
              variant="smallButton"
            />
          </View>
          <FormInputError>{userNameError}</FormInputError>
        </View>
        {/* Major Form */}
        <View style={styles.signUpFormInputContainer}>
          <FormInputLabel style={styles.signUpFormInputLabel}>
            학과
          </FormInputLabel>
          <FormInput
            value={major}
            onChangeText={(newMajor) => {
              setMajor(newMajor)
            }}
            placeholder="학과를 입력하세요"
          />
        </View>
        {/* Phone Number Form */}
        <View style={styles.signUpFormInputContainer}>
          <FormInputLabel style={styles.signUpFormInputLabel}>
            전화번호
          </FormInputLabel>
          <FormInput
            value={phoneNumber}
            onChangeText={(newPhoneNumber) => {
              setPhoneNumber(newPhoneNumber)
            }}
            placeholder="전화번호를 입력하세요"
            keyboardType="numeric"
          />
          <FormInputError>{phoneNumberError}</FormInputError>
        </View>
        {/* Sex Form */}
        <View style={styles.signUpFormInputContainer}>
          <FormInputLabel style={styles.signUpFormInputLabel}>
            성별
          </FormInputLabel>
          <View style={styles.sexButtonSection}>
            <SexRadioButton
              title="남자"
              checked={male}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              textStyle={styles.sexButtonTitle}
              checkedColor={styles.sexButtonCheckbox.color}
              onPress={onMaleButtonPressed}
            />
            <SexRadioButton
              title="여자"
              checked={female}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              textStyle={styles.sexButtonTitle}
              checkedColor={styles.sexButtonCheckbox.color}
              onPress={onFemaleButtonPressed}
            />
          </View>
        </View>

        {/* Button */}
        <Button title="순부름 시작하기" onPress={handleSignUpButtonPressed} />
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default SignUpScreen
