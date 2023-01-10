import { NavigationContainer } from "@react-navigation/native"

import OnboardingScreensNavigation from "./Onboarding"
import PublicScreensNavigation from "./Public"

const AppNavigator = () => {
  const isToken = false

  return (
    <>
      <NavigationContainer>
        {isToken ? (
          <PublicScreensNavigation />
        ) : (
          <OnboardingScreensNavigation />
        )}
      </NavigationContainer>
    </>
  )
}

export default AppNavigator
