import { Dimensions } from "react-native"

const screenWidth = Dimensions.get("window").width

const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 40,
}
const paddingHorizontal = spacing.md

const isSmallDevice = screenWidth < 375

export { isSmallDevice, paddingHorizontal, spacing }
