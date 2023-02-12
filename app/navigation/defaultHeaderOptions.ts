import { styleKit } from "../style"

const defaultHeaderOptions = (TOP_INSET: number) => ({
  headerTitleStyle: {
    fontFamily: styleKit.font.FontWeight.Bold,
    fontSize: styleKit.font.FontSize.Primary,
  },
  headerTitleAlign: "center",
  headerTitleContainerStyle: {
    paddingBottom: 10,
  },

  headerShown: true,
})

export default defaultHeaderOptions
