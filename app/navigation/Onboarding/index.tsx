import { View, Text } from "react-native"
import { createStackNavigator } from "@react-navigation/stack"

import LoginScreen from "../../screens/Onboarding/Login/LoginScreen"
import SignUpScreen from "../../screens/Onboarding/SignUp/SignUpScreen"
import FindPasswordScreen from "../../screens/Onboarding/FindPassword/FindPasswordScreen"
import ChangePasswordScreen from "../../screens/Onboarding/ChangePassword/ChangePasswordScreen"

type Props = {}

function ProfileScreen() {
  return <Text>auth</Text>
}

const Stack = createStackNavigator()
const OnboardingScreensNavigation = (props: Props) => {
  return (
    <>
      <Stack.Navigator
        screenOptions={{ cardStyle: { backgroundColor: "white" } }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </>
  )
}

export default OnboardingScreensNavigation
