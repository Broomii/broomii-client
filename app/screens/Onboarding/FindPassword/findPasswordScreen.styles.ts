import { StyleSheet } from "react-native"

export default StyleSheet.create({
  findPasswordScreenContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  buttonSection: {
    display: "flex",
    flexDirection: "row",
  },
  findPasswordInputLabel: {
    marginBottom: 10,
  },
  findPasswordInputFormContainer: {
    width: "100%",
    marginVertical: 10,
  },
  changePasswordButtonEnabled: {
    marginVertical: 15,
  },
  changePasswordButtonDisabled: {
    marginVertical: 15,
    opacity: 0.5,
  }
})