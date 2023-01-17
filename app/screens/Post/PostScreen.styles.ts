import { StyleSheet } from "react-native";
import { styleKit } from "../../style";

export default StyleSheet.create({
  container: {
    position: "relative"
  },
  titleSection: {
    paddingVertical: styleKit.spacing.md,

    borderBottomColor: styleKit.colors.gray100,
    borderBottomWidth: 0.5,
  },
  title: {
    fontSize: styleKit.font.FontSize.H3,
    fontFamily: styleKit.font.FontWeight.Medium,
    marginBottom: styleKit.spacing.sm,
  },
  time: {
    fontSize: styleKit.font.FontSize.Secondary,
    fontFamily: styleKit.font.FontWeight.Medium,
    color: styleKit.colors.gray500,

    marginBottom: styleKit.spacing.md,
  },
  shopName: {
    fontSize: styleKit.font.FontSize.Secondary,
    fontFamily: styleKit.font.FontWeight.Regular,
  },
  contentCotainer: {
    paddingVertical: styleKit.spacing.md,
  },
  content: {
    fontSize: styleKit.font.FontSize.Primary,
    fontFamily: styleKit.font.FontWeight.Regular,
    lineHeight: 100
  },
  buttonSection: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",

    position: "absolute",
    height: 70,
    paddingHorizontal: styleKit.spacing.md,

    borderTopWidth: 0.5,
    borderTopColor: styleKit.colors.gray100
  },
  tipAndLocation: {
    fontSize: styleKit.font.FontSize.Tertiary,
    fontFamily: styleKit.font.FontWeight.Regular,
    color: styleKit.colors.gray500,
  },
  tipAndLocationValue: {
    fontSize: styleKit.font.FontSize.Secondary,
    fontFamily: styleKit.font.FontWeight.Medium,
    color: styleKit.colors.primary,
  },

})