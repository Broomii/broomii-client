import { View, Text } from "react-native"
import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

type Props = {}

const Settings = createStackNavigator()

const ProfileSettings = () => <Text>Detail Setitngs</Text>

const SettingsScreens = (props: Props) => {
  return (
    <Settings.Navigator>
      <Settings.Screen name="ProfileSettings" component={ProfileSettings} />
    </Settings.Navigator>
  )
}

export default SettingsScreens
