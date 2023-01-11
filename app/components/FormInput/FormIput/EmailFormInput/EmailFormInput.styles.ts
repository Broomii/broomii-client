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
    borderWidth: 1.5,
    borderRadius: 15,

    height: 47,
    width: "100%",
  },
  emailFormInnerContainer: {
    flex: 1,
  },
  emailSuffix: {
    fontFamily: Font.FontWeight.Medium,
    fontSize: Font.FontSize.Secondary,
    color: colors.gray500,
  },
})
