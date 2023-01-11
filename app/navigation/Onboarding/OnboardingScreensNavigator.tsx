import { View, Text } from "react-native"
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack"

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
  ChangePassword: undefined
}

const Stack = createStackNavigator<OnboardingParamList>()

const OnboardingScreensNavigator = (props: Props) => {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          cardStyle: { backgroundColor: "white" },
          ...TransitionPresets.SlideFromRightIOS,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: Font.FontWeight.Bold,
            fontSize: Font.FontSize.H3,
          },
          headerStyle: {
            height: 55,
          },
          headerBackTitle: "로그인",
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
          options={{ headerShown: true, headerTitle: "비밀번호 변경하기" }}
        />
      </Stack.Navigator>
    </>
  )
}

export default OnboardingScreensNavigator
