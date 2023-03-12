import { View, Text } from "react-native"
import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import EditInfoScreen from "../../../screens/Settings/EditInfoScreen/EditInfoScreen"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { styleKit } from "../../../style"

type Props = {}

const Settings = createStackNavigator()

const SettingsScreens = (props: Props) => {
  const TOP_INSET = useSafeAreaInsets().top

  return (
    <Settings.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: styleKit.colors.primaryInvert },
      }}
    >
      <Settings.Screen
        name="EditInfoScreen"
        component={EditInfoScreen}
        options={{ headerTitle: "개인 정보 수정", headerBackTitle: "Back" }}
      />
    </Settings.Navigator>
  )
}

export default SettingsScreens
