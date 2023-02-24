import { StyleSheet } from "react-native";
import { styleKit } from "../../../../style";

export default StyleSheet.create({
  headerContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch",
    paddingTop: styleKit.spacing.sm,
    paddingHorizontal: styleKit.spacing.md,
  },
  buttonConatiner: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonLabel: {
    fontFamily: styleKit.font.FontWeight.Light,
    fontSize: styleKit.font.FontSize.Secondary,
    marginRight: styleKit.spacing.sm,
  }
})