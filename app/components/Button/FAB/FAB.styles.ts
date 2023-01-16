import { StyleSheet } from "react-native";
import { styleKit } from "../../../style";

export default StyleSheet.create({
  container: {
    backgroundColor: styleKit.colors.brand,
    borderRadius: 30,
    width: 150,
    height: 50,

    justifyContent: "center",
    position: "absolute",
    bottom: styleKit.spacing.lg,
    right: styleKit.spacing.md
  },
  icon: {
    color: styleKit.colors.primaryInvert,
    fontSize: styleKit.font.FontSize.H3,
    marginRight: styleKit.spacing.sm,
    fontWeight: "bold",
  },
  text: {
    color: styleKit.colors.primaryInvert,
    fontSize: styleKit.font.FontSize.Primary,
    fontFamily: styleKit.font.FontWeight.Bold
  }
})