import { StyleSheet, TextStyle, ViewStyle } from "react-native"

import { styleKit } from "../../style"

interface CardStyle {
  container: ViewStyle
  title: (variant: "pending" | "inProgress" | "done") => TextStyle
  location: (variant: "pending" | "inProgress" | "done") => TextStyle
  tip: (variant: "pending" | "inProgress" | "done") => TextStyle
  flagContainer: (variant: "inProgress" | "done") => ViewStyle
  flagText: TextStyle
  stateButtonContainer: ViewStyle
}

export default StyleSheet.create<CardStyle>({
  container: {
    backgroundColor: styleKit.colors.primaryInvert,
    borderBottomWidth: 0.2,
    borderBottomColor: styleKit.colors.gray100,
    padding: styleKit.spacing.md,
  },
  title: (variant: "pending" | "inProgress" | "done"): TextStyle => ({
    fontSize: styleKit.font.FontSize.H3,
    fontFamily: styleKit.font.FontWeight.Regular,
    color:
      variant === "done" ? styleKit.colors.gray300 : styleKit.colors.primary,

    marginBottom: styleKit.spacing.md,
  }),
  location: (variant: "pending" | "inProgress" | "done"): TextStyle => ({
    fontSize: styleKit.font.FontSize.Tertiary,
    fontFamily: styleKit.font.FontWeight.Light,
    color:
      variant === "done" ? styleKit.colors.gray300 : styleKit.colors.gray500,
    marginBottom: styleKit.spacing.sm,
  }),
  tip: (variant: "pending" | "inProgress" | "done") => ({
    fontSize: styleKit.font.FontSize.Primary,
    fontFamily: styleKit.font.FontWeight.Medium,
    color:
      variant === "done" ? styleKit.colors.gray300 : styleKit.colors.primary,
  }),
  flagContainer: (variant: "inProgress" | "done"): ViewStyle => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 75,
    height: 30,

    marginLeft: "auto",
    backgroundColor:
      variant === "inProgress"
        ? styleKit.colors.green
        : styleKit.colors.gray300,
    borderRadius: 7,
  }),
  flagText: {
    fontSize: styleKit.font.FontSize.Secondary,
    fontFamily: styleKit.font.FontWeight.Medium,
    color: styleKit.colors.primaryInvert,
  },
  stateButtonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    padding: styleKit.spacing.xs,
    marginLeft: "auto",
    width: 50,
    height: 30,

    borderColor: styleKit.colors.gray500,
    borderWidth: 0.3,
    borderRadius: 5,
  }
})
