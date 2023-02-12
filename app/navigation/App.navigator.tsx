import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { useContext, useEffect } from "react"
import { ActivityIndicator, View } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"

import OnboardingScreensNavigation from "./Onboarding"
import PublicScreensNavigation from "./Public"
import { AuthContext } from "../context/AuthContext"

export const MainStack = createStackNavigator()

const AppNavigator = () => {
  const isToken = false
  const { isLoading, userToken } = useContext(AuthContext)
  // console.log(userToken)
  return (
    <>
      <NavigationContainer>
        <MainStack.Navigator screenOptions={{ headerShown: false }}>
          {userToken ? (
            <MainStack.Screen
              name="PublicScreens"
              component={PublicScreensNavigation}
            />
          ) : (
            <MainStack.Screen
              name="OnboardingScreens"
              component={OnboardingScreensNavigation}
            />
          )}
        </MainStack.Navigator>
      </NavigationContainer>
    </>
  )
}

export default AppNavigator
