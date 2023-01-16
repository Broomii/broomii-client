import { StyleSheet } from "react-native";
import { styleKit } from "../../../style";

export default StyleSheet.create({
  container: {
    paddingRight: styleKit.spacing.md,
  },
  textButton: {
    fontSize: styleKit.font.FontSize.Primary,
    color: styleKit.colors.brand,
  },
})