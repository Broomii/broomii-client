import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  GestureResponderEvent,
} from "react-native"
import React, { useState, createRef, RefObject, useContext } from "react"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useHeaderHeight } from "@react-navigation/elements"

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
  checkPhoneNumberCorrect,
} from "../../../utils/onboarding/checkForm"

import { AuthContext } from "../../../context/AuthContext"

import { styleKit } from "../../../style"

type Props = {}

const SignUpScreen = (props: Props) => {
  const {
    isLoading,
    checkUsernameAtServer,
    usernameDuplicate,
    checkingUsername,
    usernameError,
    setUsernameError,
    emailError,
    setEmailError,
    checkingEmail,
    checkEmailAtServer,
    authCodeError,
    checkingAuthCode,
    checkAuthCodeAtServer,
    setAuthCodeError,
    authCodeCorrect,
    handleSignUp,
  } = useContext(AuthContext)

  const insets = useSafeAreaInsets()
  const headerHeight = useHeaderHeight()

  const [email, setEmail] = useState("")
  // const [emailError, setEmailError] = useState("")
  const [authCode, setAuthCode] = useState("")
  // const [authCodeError, setAuthCodeError] = useState("")
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [passwordConfirmError, setPasswordConfirmError] = useState("")
  const [address, setAddress] = useState("")
  const [addressError, setAddressError] = useState("")
  const [name, setName] = useState("")
  const [nameError, setNameError] = useState("")
  const [userName, setUserName] = useState("")
  // const [userNameError, setUserNameError] = useState("")
  const [major, setMajor] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [phoneNumberError, setPhoneNumberError] = useState("")
  const [male, setMale] = useState(true)
  const [female, setFemale] = useState(false)

  const [didSubmitAuthCode, setDidSubmitAuthCode] = useState(false)
  // const [authCodeCorrect, setAuthCodeCorrect] = useState(false)
  const [didSubmitUserName, setDidSubmitUserName] = useState(false)
  // const [userNameDuplicate, setUserNameDuplicate] = useState(false)

  const emailRef = createRef<TextInput>()
  const authCodeRef = createRef<TextInput>()
  const passwordRef = createRef<TextInput>()
  const passwordConfirmRef = createRef<TextInput>()
  const addressRef = createRef<TextInput>()
  const nameRef = createRef<TextInput>()
  const userNameRef = createRef<TextInput>()
  const phoneNumberRef = createRef<TextInput>()

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

  const handleUserNameCheckButtonPressed = () => {
    setDidSubmitUserName(true)
    checkUsernameAtServer(userName)
  }

  const handleSendEmailButtonPressed = () => {
    // const emailToSend = email + "@sch.ac.kr"
    const emailToSend = email
    if (!checkFormEmpty(emailToSend, setEmailError, "???????????? ???????????????")) {
      checkEmailAtServer(emailToSend)
    }
  }

  const handleConfirmAuthCodeButtonPressed = () => {
    setDidSubmitAuthCode(true)
    checkAuthCodeAtServer(authCode)
  }

  const handleSignUpButtonPressed = (): void => {
    let isEmailCorrect: boolean = false
    let isAuthCodeCorrect: boolean = false
    let isPasswordCorrect: boolean = false
    // let isPasswordConfirmCorrect: boolean = false
    let isAddressCorrect: boolean = false
    let isNameCorrect: boolean = false
    let isUsernameCorrect: boolean = false
    let isPhoneNumberCorrect: boolean = false

    // Check Email, Auth Code
    isEmailCorrect = !checkFormEmpty(
      email,
      setEmailError,
      "???????????? ???????????????",
    )

    isAuthCodeCorrect =
      !checkFormEmpty(authCode, setAuthCodeError, "??????????????? ???????????????") &&
      checkInfoSubmit(
        didSubmitAuthCode,
        setAuthCodeError,
        "????????? ???????????? ???????????????",
      ) &&
      checkInfoCorrect(
        authCodeCorrect,
        setAuthCodeError,
        "??????????????? ???????????? ????????????",
      )

    // Check Password, Password Confirm
    isPasswordCorrect = !checkFormEmpty(
      password,
      setPasswordError,
      "??????????????? ???????????????",
    )
    !checkFormEmpty(
      passwordConfirm,
      setPasswordConfirmError,
      "???????????? ????????? ???????????????",
    ) && checkPasswordSame(password, passwordConfirm, setPasswordConfirmError)

    // Check Address
    isAddressCorrect = !checkFormEmpty(
      address,
      setAddressError,
      "?????? ?????? ????????? ???????????????",
    )

    // Check Name
    isNameCorrect = !checkFormEmpty(name, setNameError, "????????? ???????????????")

    // Check Username
    isUsernameCorrect =
      !checkFormEmpty(userName, setUsernameError, "???????????? ???????????????") &&
      checkInfoSubmit(
        didSubmitUserName,
        setUsernameError,
        "??????????????? ????????????",
      ) &&
      !usernameDuplicate

    isPhoneNumberCorrect = checkPhoneNumberCorrect(
      phoneNumber,
      setPhoneNumberError,
    )

    !isPhoneNumberCorrect && focus(phoneNumberRef)
    !isUsernameCorrect && focus(userNameRef)
    !isNameCorrect && focus(nameRef)
    !isAddressCorrect && focus(addressRef)
    // !isPasswordConfirmCorrect && focus(passwordConfirmRef)
    !isPasswordCorrect && focus(passwordRef)
    !isAuthCodeCorrect && focus(authCodeRef)
    !isEmailCorrect && focus(emailRef)
    console.log(isAddressCorrect)
    //setAuthCodeError("")

    if (
      isPhoneNumberCorrect &&
      isUsernameCorrect &&
      isNameCorrect &&
      isAddressCorrect &&
      isPasswordCorrect &&
      isAuthCodeCorrect &&
      isEmailCorrect
    ) {
      handleSignUp(password, address, name, userName, phoneNumber)
    }
  }

  // onpress auth code send
  // onpress auth code check

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
            *?????????
          </FormInputLabel>
          <View style={styles.signUpFormButtonSection}>
            <EmailFormInput
              value={email}
              onChangeText={(newEmail) => {
                setEmail(newEmail)
              }}
              placeholder="???????????? ???????????????"
              ref={emailRef}
              style={{ flex: 1 }}
            />
            <Button
              title="???????????? ??????"
              onPress={handleSendEmailButtonPressed}
              variant="smallButton"
              isLoading={checkingEmail}
              style={{ minWidth: 97 }}
            />
          </View>
          <FormInputError
            style={
              emailError === "???????????? ??????????????? ?????????????????????"
                ? { color: styleKit.colors.primary }
                : {}
            }
          >
            {emailError}
          </FormInputError>
        </View>
        {/* Auth Number Form */}
        <View style={styles.signUpFormInputContainer}>
          <FormInputLabel style={styles.signUpFormInputLabel}>
            *????????????
          </FormInputLabel>
          <View style={styles.signUpFormButtonSection}>
            <FormInput
              value={authCode}
              onChangeText={(newAuthCode) => {
                setAuthCode(newAuthCode)
              }}
              placeholder="??????????????? ???????????????"
              keyboardType="numeric"
              ref={authCodeRef}
              style={{ flex: 1 }}
            />
            <Button
              title="???????????? ??????"
              onPress={handleConfirmAuthCodeButtonPressed}
              variant="smallButton"
              isLoading={checkingAuthCode}
            />
          </View>
          <FormInputError
            style={
              authCodeError === "???????????? ????????? ?????????????????????"
                ? { color: styleKit.colors.primary }
                : {}
            }
          >
            {authCodeError}
          </FormInputError>
        </View>
        {/* Password Form */}
        <View style={styles.signUpFormInputContainer}>
          <FormInputLabel style={styles.signUpFormInputLabel}>
            *????????????
          </FormInputLabel>
          <FormInput
            value={password}
            onChangeText={(newPassword) => {
              setPassword(newPassword)
            }}
            placeholder="??????????????? ???????????????"
            secureTextEntry={true}
            ref={passwordRef}
          />
          <FormInputError>{passwordError}</FormInputError>
        </View>
        {/* Password Check Form */}
        <View style={styles.signUpFormInputContainer}>
          <FormInputLabel style={styles.signUpFormInputLabel}>
            *???????????? ??????
          </FormInputLabel>
          <FormInput
            value={passwordConfirm}
            onChangeText={(newPasswordConfirm) => {
              setPasswordConfirm(newPasswordConfirm)
            }}
            placeholder="??????????????? ???????????????"
            secureTextEntry={true}
            ref={passwordConfirmRef}
          />
          <FormInputError>{passwordConfirmError}</FormInputError>
        </View>
        {/* Delivery address Form */}
        <View style={styles.signUpFormInputContainer}>
          <FormInputLabel style={styles.signUpFormInputLabel}>
            *?????? ?????? ??????
          </FormInputLabel>
          <FormInput
            value={address}
            onChangeText={(newAddress) => {
              setAddress(newAddress)
            }}
            placeholder="??????????????? ????????? ?????? ????????? ???????????????"
            ref={addressRef}
          />
          <FormInputError>{addressError}</FormInputError>
        </View>
        {/* Name Form */}
        <View style={styles.signUpFormInputContainer}>
          <FormInputLabel style={styles.signUpFormInputLabel}>
            *??????
          </FormInputLabel>
          <FormInput
            value={name}
            onChangeText={(newName) => {
              setName(newName)
            }}
            placeholder="????????? ???????????????"
            ref={nameRef}
          />
          <FormInputError>{nameError}</FormInputError>
        </View>
        {/* User Name Form */}
        <View style={styles.signUpFormInputContainer}>
          <FormInputLabel style={styles.signUpFormInputLabel}>
            *?????????
          </FormInputLabel>
          <View style={styles.signUpFormButtonSection}>
            <FormInput
              value={userName}
              onChangeText={(newUserName) => {
                setUserName(newUserName)
              }}
              placeholder="???????????? ???????????????"
              ref={userNameRef}
              style={{ flex: 1 }}
            />
            <Button
              title="?????? ??????"
              onPress={handleUserNameCheckButtonPressed}
              variant="smallButton"
              isLoading={checkingUsername}
            />
          </View>
          <FormInputError
            style={
              usernameError === "????????? ??? ?????? ????????? ?????????."
                ? {
                    color: styleKit.colors.green,
                  }
                : {}
            }
          >
            {usernameError}
          </FormInputError>
        </View>
        {/* Phone Number Form */}
        <View style={styles.signUpFormInputContainer}>
          <FormInputLabel style={styles.signUpFormInputLabel}>
            *????????????
          </FormInputLabel>
          <FormInput
            value={phoneNumber}
            onChangeText={(newPhoneNumber) => {
              setPhoneNumber(newPhoneNumber)
            }}
            placeholder="??????????????? ??????????????? (e.g. 01012345678)"
            keyboardType="numeric"
            ref={phoneNumberRef}
          />
          <FormInputError>{phoneNumberError}</FormInputError>
        </View>
        {/* Major Form */}
        <View style={styles.signUpFormInputContainer}>
          <FormInputLabel style={styles.signUpFormInputLabel}>
            ??????
          </FormInputLabel>
          <FormInput
            value={major}
            onChangeText={(newMajor) => {
              setMajor(newMajor)
            }}
            placeholder="????????? ???????????????"
          />
        </View>

        {/* Sex Form */}
        <View style={styles.signUpFormInputContainer}>
          <FormInputLabel style={styles.signUpFormInputLabel}>
            ??????
          </FormInputLabel>
          <View style={styles.sexButtonSection}>
            <SexRadioButton
              title="??????"
              checked={male}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              textStyle={styles.sexButtonTitle}
              checkedColor={styles.sexButtonCheckbox.color}
              onPress={onMaleButtonPressed}
            />
            <SexRadioButton
              title="??????"
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
        <Button
          title="????????? ????????????"
          onPress={handleSignUpButtonPressed}
          isLoading={isLoading}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default SignUpScreen
