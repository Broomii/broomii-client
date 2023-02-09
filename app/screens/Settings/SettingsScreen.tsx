import { View, Text } from "react-native"
import React, { useContext } from "react"
import { TextButton } from "../../components/Button"

import { AuthContext } from "../../context/AuthContext"

type Props = {}

const SettingsScreen = (props: Props) => {
  const { handleLogout } = useContext(AuthContext)

  return (
    <View>
      <TextButton title="로그아웃" onPress={() => handleLogout()}/>
    </View>
  )
}

export default SettingsScreen
