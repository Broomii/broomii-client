import { StyleSheet, Dimensions } from "react-native";
import { styleKit } from "../../style";

const windowWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    height: 200,
    width: windowWidth,
    backgroundColor: styleKit.colors.primaryInvert,
    padding: 0,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,

    display: "flex",
    flexDirection: "column",
  },
  menuContainer: {
    borderBottomColor: styleKit.colors.gray100,
    // borderBottomWidth: 0.3,

    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  menuText: {
    fontFamily: styleKit.font.FontWeight.Regular,
    fontSize: styleKit.font.FontSize.Header,
  }
})