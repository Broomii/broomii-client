import { StyleSheet } from "react-native"
import colors from "../../../../style/colors"
import { Font } from "../../../../style/font"

export default StyleSheet.create({
  emailFormInputContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    marginVertical: 0,

    borderColor: colors.gray300,
    borderStyle: "solid",
    borderWidth: 0.7,
    borderRadius: 16,

    height: 47,
  },
  emailFormInnerContainer: {
    flex: 1,
    height: 47,
  },
  emailSuffix: {
    fontFamily: Font.FontWeight.Medium,
    fontSize: Font.FontSize.Secondary,
    color: colors.gray500,
  },
})
