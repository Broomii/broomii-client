import { StyleSheet } from "react-native"
import colors from "../../../style/colors"
import { Font } from "../../../style/font"

export default StyleSheet.create({
  errorMessage: {
    color: colors.error,
    fontFamily: Font.FontWeight.Light,
    fontSize: Font.FontSize.Tertiary,
  },
})
