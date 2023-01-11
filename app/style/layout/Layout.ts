import { StyleSheet, Platform } from "react-native";

import { Layout } from "../../constant";

const isAndroid: boolean = Platform.OS == "android" ? true : false;


export default StyleSheet.create({
  containerNoPadding: {
    flex: 1,
  },
  containerWithPadding: {
    flex: 1,
    paddingHorizontal: Layout.PADDING_HORIZONTAL,
  },
  androidNavTitle: {
    paddingLeft: isAndroid ? 6 : 0,
  },
});