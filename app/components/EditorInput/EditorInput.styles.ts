import { StyleSheet, View, ViewStyle, TextStyle } from "react-native"
import { styleKit } from "../../style"
import { isAOS } from "../../utils/platform"

// interface EditorInputStyle {
//   outerContainer: (variant: "default" | "withButton" | "multiline") => ViewStyle
//   inputBox: ViewStyle
// }

export default StyleSheet.create<any>({
  outerContainer: (
    variant: "default" | "withButton" | "multiline",
  ): ViewStyle => {
    const isMult = variant === "multiline"

    return {
      display: "flex",
      flexDirection: isMult ? "column" : "row",
      justifyContent: "flex-start",
      alignItems: isMult ? "stretch" : "center",

      // paddingHorizontal: isMult ? styleKit.spacing.lg : 0,
      paddingVertical: isMult ? styleKit.spacing.md : 0,
      minHeight: 60,
      borderBottomWidth: isMult ? 0 : 0.5,
      borderColor: styleKit.colors.gray100,

      flex: isMult ? 1 : 0,
    }
  },
  inputBox: (variant: "default" | "withButton" | "multiline"): TextStyle => ({
    flex: 1,
    fontSize: styleKit.font.FontSize.Primary,
    minHeight: 60,
    textAlignVertical: variant === "multiline" ? "top" : "auto", // 없으면 AOS 이상함
  }),
})
