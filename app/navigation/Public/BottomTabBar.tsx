import { View, Text } from "react-native"

import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs"
import { RouteProp } from "@react-navigation/native"
import Ionicons from "@expo/vector-icons/Ionicons"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import colors from "../../style/colors"
import { Font } from "../../style/font"
import { isAOS } from "../../utils/platform"

import defaultHeaderOptions from "../defaultHeaderOptions"
import Logo from "../../components/Logo"
import HomeTopTabBar from "./Home"

import { ChattingScreen } from "../../screens/Chatting"
import SettingsScreen from "../../screens/Settings/SettingsScreen"

type BottomTabParamList = {
  Home: undefined
  Chatting: undefined
  Settings: undefined
}

const BottomTab = createBottomTabNavigator<BottomTabParamList>()

/* Options Start */

// Animation
const forFade = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

// TabBar
const TAB_ICON = {
  Home: "home-outline",
  Chatting: "chatbubble-ellipses-outline",
  Settings: "person-outline",
}

const tabBarOptions = {
  tabBarActiveTintColor: colors.primary,
  tabBarInactiveTintColor: colors.gray300,
  tabBarShowLabel: false,
  tabBarStyle: {
    height: isAOS ? 55 : 75,
    paddingTop: isAOS ? 0 : 13,
  },
}

// Screens
const bottomTabScreenOptions =
  (TOP_INSET: number) =>
  ({ route }: BottomTabScreenProps<BottomTabParamList>) => ({
    tabBarIcon: ({ color }: { color: string }) => {
      const routeName: "Home" | "Chatting" | "Settings" = route.name
      const iconName: string = TAB_ICON[routeName]

      return <Ionicons name={iconName} size={27} color={color} />
    },
    ...tabBarOptions,
    ...defaultHeaderOptions(TOP_INSET),
    headerStyle: {
      height: 52 + TOP_INSET,
    },
    headerTitleAlign: "left",
    cardStyleInterpolator: forFade,
  })



/* Options End */

const BottomTabBar = () => {
  const TOP_INSET: number = useSafeAreaInsets().top

  return (
    <>
      <BottomTab.Navigator
        screenOptions={bottomTabScreenOptions(TOP_INSET)}
        sceneContainerStyle={{ backgroundColor: colors.primaryInvert }}
      >
        <BottomTab.Screen
          name="Home"
          component={HomeTopTabBar}
          options={{
            headerTitle: () => <Logo />,
            headerStyle: {
              height: 55 + TOP_INSET,
              borderBottomColor: "white",
            },
            headerTitleContainerStyle: {
              paddingTop: 10,
              paddingLeft: 0,
            },
            headerShadowVisible: false,
          }}
        />
        <BottomTab.Screen
          name="Chatting"
          component={ChattingScreen} // chatting screen
          options={{
            headerTitle: "채팅",
          }}
        />
        <BottomTab.Screen
          name="Settings"
          component={SettingsScreen} //setting screen
          options={{
            headerTitle: "마이페이지",
          }}
        />
      </BottomTab.Navigator>
    </>
  )
}

export default BottomTabBar
