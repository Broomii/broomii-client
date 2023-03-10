import { View, Text } from "react-native"
import React, { useState, useEffect } from "react"
import { StackNavigationProp } from "@react-navigation/stack"
import { useNavigation } from "@react-navigation/native"

import Label from "../../../components/Label"
import {
  FormInput,
  FormInputLabel,
  FormInputError,
} from "../../../components/FormInput"
import { Button, HeaderRightCompleteButton } from "../../../components/Button"

import { checkUsernameAtServer } from "../../../services/infoValidationApi"
import { fetchMyInfo, updateMyInfo } from "../../../services/settingsApi"

import styles from "./EditinfoScreen.styles"
import { styleKit } from "../../../style"

import {
  checkFormEmpty,
  checkInfoSubmit,
} from "../../../utils/onboarding/checkForm"
import { PublicStackParamList } from "../../../navigation/Public/PublicScreensNavigator"
import { getJWT } from "../../../utils/secureStore/secureStore"

type Props = {}

type EditInfoScreenNavigationProp = StackNavigationProp<
  PublicStackParamList,
  "SettingsScreens"
>

const EditInfoScreen = () => {
  const navigation = useNavigation<EditInfoScreenNavigationProp>()

  const [name, setName] = useState("")
  const [nameError, setNameError] = useState("")

  const [prevUsername, setPrevUsername] = useState("")
  const [username, setUsername] = useState("")
  const [usernameError, setUsernameError] = useState("")
  const [usernameDuplicate, setUsernameDuplicate] = useState(false)
  const [didSubmitUsername, setDidSubmitUsername] = useState(false)

  const [checkingUsername, setCheckingUsername] = useState(false)

  const [address, setAddress] = useState("")
  const [addressError, setAddressError] = useState("")

  const [major, setMajor] = useState("")

  const handleUsernameCheckButtonPressed = () => {
    if (username === prevUsername) return

    setCheckingUsername(true)
    checkUsernameAtServer(username)
      .then((res) => {
        const { message, isValid } = res
        setUsernameError(message)

        if (isValid) {
          setUsernameDuplicate(false)
        } else {
          setUsernameDuplicate(true)
        }
      })
      .catch((e: Error) => {
        const errorCode = e.message
        if (errorCode == "417") {
          setUsernameError("????????? ??????????????????")
        }
      })
      .finally(() => {
        setDidSubmitUsername(true)
        setCheckingUsername(false)
      })
  }

  const handleSubmit = () => {
    let isNameCorrect: boolean = false
    let isUsernameCorrect: boolean = false
    let isAddressCorrect: boolean = false
    console.log(usernameDuplicate)
    // Check Name
    isNameCorrect = !checkFormEmpty(name, setNameError, "????????? ???????????????")

    // Check Username
    const usernameSubmit =
      prevUsername === username
        ? true
        : checkInfoSubmit(
            didSubmitUsername,
            setUsernameError,
            "??????????????? ????????????",
          )

    isUsernameCorrect =
      !checkFormEmpty(username, setUsernameError, "???????????? ???????????????") &&
      usernameSubmit &&
      !usernameDuplicate

    // Check Address
    isAddressCorrect = !checkFormEmpty(
      address,
      setAddressError,
      "?????? ?????? ????????? ???????????????",
    )

    if (isUsernameCorrect && isNameCorrect && isAddressCorrect) {
      getJWT((jwt) => updateMyInfo(jwt, name, username, address, major))
    }
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderRightCompleteButton title="??????" onPress={handleSubmit} />
      ),
    })
  }, [name, username, address, major])

  useEffect(() => {
    getJWT((jwt) =>
      fetchMyInfo(jwt).then((res) => {
        const { name, nickName, department, defaultDeliveryAddress } = res as {
          name: string
          nickName: string
          department: string
          defaultDeliveryAddress: string
        }

        setName(name)
        setPrevUsername(nickName)
        setUsername(nickName)
        setMajor(department)
        setAddress(defaultDeliveryAddress)
      }),
    )
  }, [])

  return (
    <View style={styleKit.layout.containerWithPadding}>
      {/* Name Form */}
      <View style={styles.editInfoFormInputContainer}>
        <FormInputLabel style={styles.editInfoFormInputLabel}>
          ??????
        </FormInputLabel>
        <FormInput
          value={name}
          onChangeText={(newName) => {
            setName(newName)
          }}
          placeholder="????????? ???????????????"
        />
        <FormInputError>{nameError}</FormInputError>
      </View>
      {/* User Name Form */}
      <View style={styles.editInfoFormInputContainer}>
        <FormInputLabel style={styles.editInfoFormInputLabel}>
          ?????????
        </FormInputLabel>
        <View style={styles.editInfoFormButtonSection}>
          <FormInput
            value={username}
            onChangeText={(newUsername) => {
              setUsername(newUsername)
            }}
            placeholder="???????????? ???????????????"
            style={{ flex: 1 }}
          />
          <Button
            title="?????? ??????"
            onPress={handleUsernameCheckButtonPressed}
            variant="smallButton"
            isLoading={checkingUsername}
          />
        </View>
        <FormInputError
          style={
            usernameError === "?????? ????????? ??????????????????."
              ? {
                  color: styleKit.colors.green,
                }
              : {}
          }
        >
          {usernameError}
        </FormInputError>
      </View>
      {/* Delivery address Form */}
      <View style={styles.editInfoFormInputContainer}>
        <FormInputLabel style={styles.editInfoFormInputLabel}>
          ?????? ?????? ??????
        </FormInputLabel>
        <FormInput
          value={address}
          onChangeText={(newAddress) => {
            setAddress(newAddress)
          }}
          placeholder="??????????????? ????????? ?????? ????????? ???????????????"
        />
        <FormInputError>{addressError}</FormInputError>
      </View>
      {/* Major Form */}
      <View style={styles.editInfoFormInputContainer}>
        <FormInputLabel style={styles.editInfoFormInputLabel}>
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
    </View>
  )
}

export default EditInfoScreen
