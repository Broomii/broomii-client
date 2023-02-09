import { StyleSheet } from "react-native"
import { Font } from "../../../style/font"

export default StyleSheet.create({
  formInputLabel: {
    fontFamily: Font.FontWeight.Regular,
    fontSize: Font.FontSize.Secondary,
    marginVertical: 0,
    lineHeight: Font.FontSize.H2, // if not -> android has larger line height
  },
})
