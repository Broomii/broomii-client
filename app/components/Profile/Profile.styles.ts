import { StyleSheet } from "react-native";
import { styleKit } from "../../style";

export default StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",

    paddingVertical: styleKit.spacing.md,

    borderBottomWidth: 0.3,
    borderColor: styleKit.colors.gray100,
  },
  startSection: {
    display: "flex",
    alignContent: "center",
  },
  icon: {
    width: 57,
    height: 57,
    marginRight: styleKit.spacing.md,
  },
  username: {
    fontSize: styleKit.font.FontSize.Primary,
    fontFamily: styleKit.font.FontWeight.Medium,
    color: styleKit.colors.primary,

    marginBottom: styleKit.spacing.xs
  },
  major: {
    fontSize: styleKit.font.FontSize.Tertiary,
    fontFamily: styleKit.font.FontWeight.Regular,
    color: styleKit.colors.gray500
  },
  trust: {
    fontSize: styleKit.font.FontSize.Tertiary,
    fontFamily: styleKit.font.FontWeight.Light,
  },
  trustValue: {
    fontSize: styleKit.font.FontSize.Tertiary,
    fontFamily: styleKit.font.FontWeight.Light,
    color: styleKit.colors.skyblue,

    marginLeft: "auto",
  },
})