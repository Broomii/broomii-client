import { StyleSheet } from "react-native";
import { styleKit } from "../../style";

export default StyleSheet.create({
  editInfoContainer: {
    paddingVertical: styleKit.spacing.md,
    borderBottomWidth: 0.3,
    borderBottomColor: styleKit.colors.gray100,
  },
  editInfoLabel: {
    marginBottom: styleKit.spacing.md,
  },
  logoutButton: {
    marginTop: styleKit.spacing.md,
  }
})