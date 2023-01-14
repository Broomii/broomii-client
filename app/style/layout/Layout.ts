import { StyleSheet, Platform } from "react-native"

import { Layout } from "../../constant"

export default StyleSheet.create({
  containerNoPadding: {
    flex: 1,
  },
  containerWithPadding: {
    flex: 1,
    paddingHorizontal: Layout.paddingHorizontal,
  },
  containerWithHorizontalFlex: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
})
