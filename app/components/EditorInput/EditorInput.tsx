import { View, Text, TextInput, TextInputProps } from "react-native"
import React from "react"

import { Button } from "../Button"
import { styleKit } from "../../style"

import styles from "./EditorInput.styles"

interface EditorInputProps extends TextInputProps {
  variant?: "default" | "withButton" | "multiline"
}

const EditorInput = ({
  placeholder,
  variant = "default",
  scrollEnabled,
}: EditorInputProps) => {
  return (
    <>
      <View style={[styles.outerContainer(variant)]}>
        <TextInput
          style={styles.inputBox(variant)}
          placeholder={placeholder}
          multiline={variant === "multiline"}
          scrollEnabled={scrollEnabled}
        />
        {variant === "withButton" ? (
          <Button
            title="기본 주소 불러오기"
            variant="smallButton"
            onPress={() => null}
          />
        ) : null}
      </View>
    </>
  )
}

export default EditorInput
