import { StyleSheet } from "react-native";

export default StyleSheet.create({
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 46
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
    marginVertical: 30,
  },
})