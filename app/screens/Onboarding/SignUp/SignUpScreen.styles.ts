import { StyleSheet } from "react-native"
import colors from "../../../style/colors"
import { Font } from "../../../style/font"

export default StyleSheet.create({
  signUpScreenContainer: {
    // paddingBottom: insets.bottom
  },
  signUpFormInputContainer: {
    width: "100%",
    marginVertical: 10,
  },
  signUpFormInputLabel: {
    marginBottom: 10,
  },
  signUpFormButtonSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sexButtonSection: {
    display: "flex",
    flexDirection: "row",
  },
  sexButtonTitle: {
    fontFamily: Font.FontWeight.Medium,
    fontSize: Font.FontSize.Primary,
  },
  sexButtonCheckbox: {
    color: colors.brand,
  },
})
