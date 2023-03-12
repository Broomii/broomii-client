import { View, Text } from "react-native"
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { Font } from "../../style/font"
import colors from "../../style/colors"

import LoginScreen from "../../screens/Onboarding/Login/LoginScreen"
import SignUpScreen from "../../screens/Onboarding/SignUp/SignUpScreen"
import FindPasswordScreen from "../../screens/Onboarding/FindPassword/FindPasswordScreen"
import ChangePasswordScreen from "../../screens/Onboarding/ChangePassword/ChangePasswordScreen"

type Props = {}

export type OnboardingParamList = {
  Login: undefined
  SignUp: undefined
  FindPassword: undefined
  ChangePassword: {
    email: string | null
  }
}

const Stack = createStackNavigator<OnboardingParamList>()

const OnboardingScreensNavigator = (props: Props) => {
  const insets = useSafeAreaInsets()

  return (
    <>
      <Stack.Navigator
        screenOptions={{
          cardStyle: { backgroundColor: "white" },
          ...TransitionPresets.SlideFromRightIOS,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: Font.FontWeight.Bold,
            fontSize: Font.FontSize.Primary,
          },
          headerTitleContainerStyle: {
            paddingBottom: 10,
          },
          headerBackTitle: "로그인",
          headerStyle: {
            height: 50 + insets.top,
          },
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ headerShown: true, headerTitle: "회원가입" }}
        />
        <Stack.Screen
          name="FindPassword"
          component={FindPasswordScreen}
          options={{ headerShown: true, headerTitle: "비밀번호 찾기" }}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePasswordScreen}
          options={{
            headerShown: true,
            headerTitle: "비밀번호 변경하기",
            headerBackTitle: " ",
          }}
        />
      </Stack.Navigator>
    </>
  )
}

export default OnboardingScreensNavigator
