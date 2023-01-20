import { StyleSheet } from "react-native";
import { styleKit } from "../../style";

export default StyleSheet.create({
  container: {
    alignItems: "center",
    padding: styleKit.spacing.md,

    borderBottomWidth: 0.3,
    borderBottomColor: styleKit.colors.gray100,
  },
  icon: {
    width: 60,
    height: 60,
  },
  textSection: {
    marginLeft: styleKit.spacing.md
  },
  usernameAndTimePastContainer: {
    alignItems: "center",
  },
  username: {
    fontSize: styleKit.font.FontSize.Primary,
    fontFamily: styleKit.font.FontWeight.Medium,
    color: styleKit.colors.primary,

    marginRight: styleKit.spacing.sm,
  },
  timePast: {
    fontSize: styleKit.font.FontSize.Secondary,
    fontFamily: styleKit.font.FontWeight.Medium,
    color: styleKit.colors.gray500,
  },
  lastChat: {
    fontSize: styleKit.font.FontSize.Secondary,
    fontFamily: styleKit.font.FontWeight.Light,
    color: styleKit.colors.primary,

    marginTop: styleKit.spacing.xs,
  }
})