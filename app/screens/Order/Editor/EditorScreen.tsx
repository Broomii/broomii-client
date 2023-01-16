import { View, Text } from "react-native"
import React from "react"

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

import EditorInput from "../../../components/EditorInput"

import { isAOS } from "../../../utils/platform"
import { styleKit } from "../../../style"
import styles from "./EditorScreen.styles"

type Props = {}

const EditorScreen = (props: Props) => {
  return (
    <KeyboardAwareScrollView
      style={[styleKit.layout.containerWithPadding, styles.container]}
    >
      <EditorInput placeholder="제목 (상품명 등을 자유롭게 입력해주세요)" />
      <EditorInput placeholder="매장명" />
      <EditorInput placeholder="배달 주소" variant="withButton" />
      <EditorInput placeholder="주문 금액" />
      <EditorInput placeholder="배달팁" />
      <EditorInput
        variant="multiline"
        placeholder={`기타 요구사항을 자유롭게 입력해주세요.\nex) 빼빼로 2통 배달 부탁드려요`}
        scrollEnabled={false}
      />
    </KeyboardAwareScrollView>
  )
}

export default EditorScreen
