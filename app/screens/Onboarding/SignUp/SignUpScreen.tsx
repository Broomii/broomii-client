import { View, Text, ScrollView } from "react-native"
import React, { useState } from "react"

import {
  FormInput,
  FormInputLabel,
  FormInputError,
  EmailFormInput,
} from "../../../components/FormInput"
import { Button } from "../../../components/Button"

import styles from "./SignUpScreen.styles"
import Layout from "../../../style/layout"

type Props = {}

const SignUpScreen = (props: Props) => {
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")
  return (
    <View
      style={{
        ...Layout.containerWithPadding,
        ...styles.signUpScreenContainer,
      }}
    >
      <ScrollView>
        {/* Email Form */}
        <View style={styles.signUpFormInputContainer}>
          <FormInputLabel style={styles.signUpFormInputLabel}>
            *이메일
          </FormInputLabel>
          <EmailFormInput
            value={email}
            onChangeText={(newEmail) => {
              setEmail(newEmail)
            }}
            placeholder="아이디"
          />
          <FormInputError>{emailError}</FormInputError>
        </View>
        {/* Auth Number Form */}
        <View style={styles.signUpFormInputContainer}>
          <FormInputLabel style={styles.signUpFormInputLabel}>
            *인증번호
          </FormInputLabel>
          <FormInput
            value={email}
            onChangeText={(newEmail) => {
              setEmail(newEmail)
            }}
            placeholder="아이디"
          />
          <FormInputError>{emailError}</FormInputError>
        </View>
        {/* Password Form */}
        <View style={styles.signUpFormInputContainer}>
          <FormInputLabel style={styles.signUpFormInputLabel}>
            *비밀번호
          </FormInputLabel>
          <FormInput
            value={email}
            onChangeText={(newEmail) => {
              setEmail(newEmail)
            }}
            placeholder="아이디"
          />
          <FormInputError>{emailError}</FormInputError>
        </View>
        {/* Password Check Form */}
        <View style={styles.signUpFormInputContainer}>
          <FormInputLabel style={styles.signUpFormInputLabel}>
            *비밀번호 확인
          </FormInputLabel>
          <FormInput
            value={email}
            onChangeText={(newEmail) => {
              setEmail(newEmail)
            }}
            placeholder="아이디"
          />
          <FormInputError>{emailError}</FormInputError>
        </View>
        {/* Delivery Adress Form */}
        <View style={styles.signUpFormInputContainer}>
          <FormInputLabel style={styles.signUpFormInputLabel}>
            *기본 배달 주소
          </FormInputLabel>
          <FormInput
            value={email}
            onChangeText={(newEmail) => {
              setEmail(newEmail)
            }}
            placeholder="아이디"
          />
          <FormInputError>{emailError}</FormInputError>
        </View>
        {/* Name Form */}
        <View style={styles.signUpFormInputContainer}>
          <FormInputLabel style={styles.signUpFormInputLabel}>
            *이름
          </FormInputLabel>
          <FormInput
            value={email}
            onChangeText={(newEmail) => {
              setEmail(newEmail)
            }}
            placeholder="아이디"
          />
          <FormInputError>{emailError}</FormInputError>
        </View>
        {/* User Name Form */}
        <View style={styles.signUpFormInputContainer}>
          <FormInputLabel style={styles.signUpFormInputLabel}>
            *닉네임
          </FormInputLabel>
          <FormInput
            value={email}
            onChangeText={(newEmail) => {
              setEmail(newEmail)
            }}
            placeholder="아이디"
          />
          <FormInputError>{emailError}</FormInputError>
        </View>
        {/* Major Form */}
        <View style={styles.signUpFormInputContainer}>
          <FormInputLabel style={styles.signUpFormInputLabel}>
            학과
          </FormInputLabel>
          <FormInput
            value={email}
            onChangeText={(newEmail) => {
              setEmail(newEmail)
            }}
            placeholder="아이디"
          />
        </View>
        {/* Phone Number Form */}
        <View style={styles.signUpFormInputContainer}>
          <FormInputLabel style={styles.signUpFormInputLabel}>
            전화번호
          </FormInputLabel>
          <FormInput
            value={email}
            onChangeText={(newEmail) => {
              setEmail(newEmail)
            }}
            placeholder="아이디"
          />
          <FormInputError>{emailError}</FormInputError>
        </View>
        {/* Sex Form */}
        <View style={styles.signUpFormInputContainer}>
          <FormInputLabel style={styles.signUpFormInputLabel}>
            성별
          </FormInputLabel>
        </View>

        {/* Button */}
        <Button title="순부름 시작하기" onPress={() => null} />
      </ScrollView>
    </View>
  )
}

export default SignUpScreen
