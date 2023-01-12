import { StyleSheet } from "react-native"
import colors from "../../style/colors"
import { Font } from "../../style/font"

export default StyleSheet.create({
  defaultButtonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    borderRadius: 15,
    width: "100%",
    height: 50,

    backgroundColor: colors.brand,
  },
  defaultButtonTitle: {
    color: colors.primaryInvert,
    fontSize: Font.FontSize.H3,
    fontFamily: Font.FontWeight.Medium,
    lineHeight: Font.FontSize.H3 + 10, // 없으면 다르게 보인다
  },
  thickButtonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    borderRadius: 15,
    width: "100%",
    height: 60,

    backgroundColor: colors.brand,
  },
  smallButtonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    borderRadius: 15,
    width: 100,
    height: 47,
    marginLeft: 4,

    backgroundColor: colors.brand,
  },
  smallButtonTitle: {
    color: colors.primaryInvert,
    fontSize: Font.FontSize.Tertiary,
    fontFamily: Font.FontWeight.Medium,
    lineHeight: Font.FontSize.Tertiary + 5, // 없으면 다르게 보인다
  }
})
