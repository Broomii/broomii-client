import { StyleSheet, TextStyle, ViewStyle } from "react-native"

import { styleKit } from "../../style"

interface CardStyle {
  container: ViewStyle
  title: (variant: "pending" | "inProgress" | "done") => TextStyle
  location: (variant: "pending" | "inProgress" | "done") => TextStyle
  tip: (variant: "pending" | "inProgress" | "done") => TextStyle
  flagContainer: (variant: "inProgress" | "done") => ViewStyle
  flagText: TextStyle
}

export default StyleSheet.create<CardStyle | any>({
  container: {
    backgroundColor: styleKit.colors.primaryInvert,
    borderBottomWidth: 0.2,
    borderBottomColor: styleKit.colors.gray100,
    padding: styleKit.spacing.md,
  },
  title: (variant: "pending" | "inProgress" | "done") => ({
    fontSize: styleKit.font.FontSize.H3,
    fontFamily: styleKit.font.FontWeight.Medium,
    color:
      variant === "done" ? styleKit.colors.gray300 : styleKit.colors.primary,

    marginBottom: styleKit.spacing.md,
  }),
  location: (variant: "pending" | "inProgress" | "done") => ({
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
})
