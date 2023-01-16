import { StyleSheet } from "react-native"

import { styleKit } from "../../style"

export default StyleSheet.create({
  defaultButtonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    borderRadius: 15,
    width: "100%",
    height: 60,
    backgroundColor: styleKit.colors.brand,
  },
  defaultButtonTitle: {
    color: styleKit.colors.primaryInvert,
    fontSize: styleKit.font.FontSize.H3,
    fontFamily: styleKit.font.FontWeight.Bold,
    // lineHeight: styleKit.font.FontSize.H3 + 10, // 없으면 다르게 보인다
  },
  smallButtonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    borderRadius: 15,

    minWidth: "auto",
    minHeight: 40,
    marginLeft: 4,
    paddingHorizontal: styleKit.spacing.sm,

    backgroundColor: styleKit.colors.brand,
  },
  smallButtonTitle: {
    color: styleKit.colors.primaryInvert,
    fontSize: styleKit.font.FontSize.Tertiary,
    fontFamily: styleKit.font.FontWeight.Medium,
    // lineHeight: styleKit.font.FontSize.Tertiary + 5, // 없으면 다르게 보인다
  }
})
