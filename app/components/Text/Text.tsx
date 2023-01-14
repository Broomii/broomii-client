import { Text as RNText, TextProps, StyleSheet } from "react-native"

const Text = (props: TextProps) => {
  const acceptedStyle: any = props.style
  const acceptedFontSize = acceptedStyle?.fontSize

  let newStyle = null
  if (acceptedStyle?.fontFamily) {
    newStyle = StyleSheet.create({
      ...acceptedStyle,
      lineHeight: acceptedFontSize * 1.4,
    })
  }
  return (
    <RNText {...props} style={newStyle ? newStyle : acceptedStyle}>
      {props.children}
    </RNText>
  )
}

export default Text
