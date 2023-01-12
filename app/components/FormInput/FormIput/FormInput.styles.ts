import { StyleSheet } from "react-native"
import colors from "../../../style/colors"

export default StyleSheet.create({
  formInputContainer: {
    display: "flex",
    justifyContent: "center",
    paddingHorizontal: 8,
    marginVertical: 0,

    borderColor: colors.gray300,
    borderStyle: "solid",
    borderWidth: 1.5,
    borderRadius: 15,

    height: 47,
    width: "auto",
  },
  formInputInnerContainer: {
    height: 47
  }
})
