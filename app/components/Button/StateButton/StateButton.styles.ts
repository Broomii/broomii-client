import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { styleKit } from "../../../style";

export default StyleSheet.create({
  container: {
    borderColor: styleKit.colors.gray500,
    borderWidth: 0.7,
    maxWidth: 88,
    borderRadius: 8,
    paddingVertical: styleKit.spacing.xs,
    paddingHorizontal: styleKit.spacing.sm,

    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title:{
    fontFamily: styleKit.font.FontWeight.Medium,
    fontSize: styleKit.font.FontSize.Tertiary,
    color: styleKit.colors.primary,
  },
})