import { View, Pressable, ViewStyle } from "react-native"
import React from "react"

import Text from "../Text"
import { Overlay } from "@rneui/base"

import styles from "./OverlayMenu.styles"
import { styleKit } from "../../style"

type MenuType = {
  menuName: string
  menuAction: () => void
}

type OverlayMenuProps = {
  menuList: MenuType[]
  isVisible: boolean
  onBackDropPress: () => void
  containerStyle?: ViewStyle
}

const OverlayMenu = ({
  menuList,
  isVisible,
  onBackDropPress,
  containerStyle,
}: OverlayMenuProps) => {
  return (
    <Overlay
      overlayStyle={[styles.container, containerStyle]}
      isVisible={isVisible}
      onBackdropPress={onBackDropPress}
    >
      <Pressable style={styles.menuContainer} onPress={menuList[0].menuAction}>
        <Text style={styles.menuText}>{menuList[0].menuName}</Text>
      </Pressable>
      <Pressable style={styles.menuContainer} onPress={menuList[1].menuAction}>
        <Text
          style={[
            styles.menuText,
            menuList[1].menuName === "삭제하기"
              ? { color: styleKit.colors.error }
              : {},
          ]}
        >
          {menuList[1].menuName}
        </Text>
      </Pressable>
      <Pressable
        style={[styles.menuContainer, { flex: menuList.length <= 2 ? 0 : 1 }]}
        onPress={menuList.length <= 2 ? () => null : menuList[2].menuAction}
      >
        <Text style={styles.menuText}>
          {menuList.length <= 2 ? "" : menuList[2].menuName}
        </Text>
      </Pressable>
    </Overlay>
  )
}

export default OverlayMenu
