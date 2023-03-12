import { View, Text } from "react-native"
import React, { useContext, useEffect, useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"

import { TextButton } from "../../components/Button"

import { AuthContext } from "../../context/AuthContext"
import { styleKit } from "../../style"
import Profile from "../../components/Profile"
import Label from "../../components/Label"
import { PublicStackParamList } from "../../navigation/Public/PublicScreensNavigator"

import { fetchMyProfile } from "../../services/settingsApi"
import { getJWT } from "../../utils/secureStore/secureStore"

import styles from "./SettingsScreen.styles"

type Props = {}

type SettingsScreenNavigationProp = StackNavigationProp<
  PublicStackParamList,
  "BottomTabBar"
>

const SettingsScreen = (props: Props) => {
  const { handleLogout } = useContext(AuthContext)
  const navigation = useNavigation<SettingsScreenNavigationProp>()

  const [username, setUsername] = useState("")
  const [major, setMajor] = useState("")

  const handleEditInfoButtonPressed = () => {
    navigation.navigate("SettingsScreens")
  }

  useEffect(() => {
    getJWT((jwt) =>
      fetchMyProfile(jwt).then((res) => {
        const { nickName, department } = res as {
          nickName: string
          department: string
        }

        setUsername(nickName)
        setMajor(department)
      }),
    )
  }, [])

  return (
    <View style={styleKit.layout.containerWithPadding}>
      <Profile username={username} major={major} />
      <View style={styles.editInfoContainer}>
        <Label style={styles.editInfoLabel}>정보 수정</Label>
        <TextButton
          title="개인 정보 수정"
          onPress={handleEditInfoButtonPressed}
          titleStyle={{ fontSize: styleKit.font.FontSize.Primary }}
        />
      </View>
      <TextButton
        title="로그아웃"
        onPress={() => handleLogout()}
        containerStyle={styles.logoutButton}
      />
    </View>
  )
}

export default SettingsScreen
