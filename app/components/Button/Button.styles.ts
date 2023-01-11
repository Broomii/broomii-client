import { StyleSheet } from "react-native";
import colors from "../../style/colors";
import { Font } from "../../style/font";

export default StyleSheet.create({
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    borderRadius: 15,
    width: "100%",
    height: 50,
    
    backgroundColor: colors.brand,
  },
  buttonTitle: {
    color: colors.primaryInvert,
    fontSize: Font.FontSize.H3,
    fontFamily: Font.FontWeight.Medium,
    lineHeight: Font.FontSize.H3 + 10, // 없으면 다르게 보인다
  }
})