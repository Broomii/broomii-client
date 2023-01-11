import { StyleSheet } from "react-native"
import { Font } from "../../../style/font"

export default StyleSheet.create({
  loginScreenContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 46,
  },
  logo: {
    width: 300,
    height: 140,
  },
  loginFormInputContainer: {
    width: "100%",
    marginVertical: 10,
  },
  loginFormInputLabel: {
    marginBottom: 10,
  },
  forgotPasswordContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  forgotPasswordButton: {
    marginHorizontal: 20,
  },
  loginButton: {
    marginVertical: 15,
  },
  spacer: {
    height: Font.FontSize.Tertiary,
    backgroundColor: "blue",
    width: 20,
  },
})
