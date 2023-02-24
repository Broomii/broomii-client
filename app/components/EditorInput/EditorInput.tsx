import { View, Text, TextInput, TextInputProps, ViewStyle } from "react-native"
import React from "react"

import { Button } from "../Button"
import { styleKit } from "../../style"

import styles from "./EditorInput.styles"

interface EditorInputProps extends TextInputProps {
  variant?: "default" | "withButton" | "multiline"
  inputStyle?: ViewStyle
  outerContainerStyle?: ViewStyle
  onButtonPress?: () => void
}

const EditorInput = ({
  placeholder,
  variant = "default",
  scrollEnabled,
  inputStyle,
  outerContainerStyle,
  keyboardType,
  value,
  onChangeText,
  onButtonPress,
}: EditorInputProps) => {
  return (
    <>
      <View style={[styles.outerContainer(variant), outerContainerStyle]}>
        <TextInput
          style={[styles.inputBox(variant), inputStyle]}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          multiline={variant === "multiline"}
          scrollEnabled={scrollEnabled}
          keyboardType={keyboardType}
        />
        {variant === "withButton" ? (
          <Button
            title="기본 주소 불러오기"
            variant="smallButton"
            onPress={onButtonPress}
          />
        ) : null}
      </View>
    </>
  )
}

export default EditorInput
