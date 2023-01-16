import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"

import OnboardingScreensNavigation from "./Onboarding"
import PublicScreensNavigation from "./Public"

export const MainStack = createStackNavigator()

const AppNavigator = () => {
  const isToken = true

  return (
    <>
      <NavigationContainer>
        <MainStack.Navigator screenOptions={{ headerShown: false }}>
          {isToken ? (
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
