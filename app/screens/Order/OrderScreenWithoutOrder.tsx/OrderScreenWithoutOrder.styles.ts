import { StyleSheet } from "react-native"
import { spacing } from "../../../constant/Layout"
import { styleKit } from "../../../style"

export default StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    padding: styleKit.spacing.xl,
  },
  emojiContainer: {
    width: 200,
    height: 200,
    marginBottom: styleKit.spacing.xl,
  },
  label: {
    fontSize: styleKit.font.FontSize.H3,
    fontFamily: styleKit.font.FontWeight.Regular,
    color: styleKit.colors.gray500,
    marginBottom: styleKit.spacing.lg,
  },
  button: {},
})
