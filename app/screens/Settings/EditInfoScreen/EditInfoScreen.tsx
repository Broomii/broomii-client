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
          setUsernameError("중복된 닉네임입니다")
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
    isNameCorrect = !checkFormEmpty(name, setNameError, "이름을 입력하세요")

    // Check Username
    const usernameSubmit =
      prevUsername === username
        ? true
        : checkInfoSubmit(
            didSubmitUsername,
            setUsernameError,
            "중복확인을 해주세요",
          )

    isUsernameCorrect =
      !checkFormEmpty(username, setUsernameError, "닉네임을 입력하세요") &&
      usernameSubmit &&
      !usernameDuplicate

    // Check Address
    isAddressCorrect = !checkFormEmpty(
      address,
      setAddressError,
      "기본 배달 주소를 입력하세요",
    )

    if (isUsernameCorrect && isNameCorrect && isAddressCorrect) {
      console.log("dd")
      getJWT((jwt) => updateMyInfo(jwt, name, username, address, major)
      .then(() => {
        navigation.navigate("BottomTabBar")
      }))
    }
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderRightCompleteButton title="완료" onPress={handleSubmit} />
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
          이름
        </FormInputLabel>
        <FormInput
          value={name}
          onChangeText={(newName) => {
            setName(newName)
          }}
          placeholder="이름을 입력하세요"
        />
        <FormInputError>{nameError}</FormInputError>
      </View>
      {/* User Name Form */}
      <View style={styles.editInfoFormInputContainer}>
        <FormInputLabel style={styles.editInfoFormInputLabel}>
          닉네임
        </FormInputLabel>
        <View style={styles.editInfoFormButtonSection}>
          <FormInput
            value={username}
            onChangeText={(newUsername) => {
              setUsername(newUsername)
            }}
            placeholder="닉네임을 입력하세요"
            style={{ flex: 1 }}
          />
          <Button
            title="중복 확인"
            onPress={handleUsernameCheckButtonPressed}
            variant="smallButton"
            isLoading={checkingUsername}
          />
        </View>
        <FormInputError
          style={
            usernameError === "사용 가능한 닉네임입니다."
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
          기본 배달 주소
        </FormInputLabel>
        <FormInput
          value={address}
          onChangeText={(newAddress) => {
            setAddress(newAddress)
          }}
          placeholder="기본값으로 설정할 배달 주소를 입력하세요"
        />
        <FormInputError>{addressError}</FormInputError>
      </View>
      {/* Major Form */}
      <View style={styles.editInfoFormInputContainer}>
        <FormInputLabel style={styles.editInfoFormInputLabel}>
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
    </View>
  )
}

export default EditInfoScreen
