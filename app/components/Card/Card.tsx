import { View, Pressable, TouchableNativeFeedback, ViewStyle } from "react-native"
import React, { useState } from "react"

import { Ionicons } from "@expo/vector-icons"
import Text from "../Text"

import { styleKit } from "../../style"
import styles from "./Card.styles"
import { isAOS } from "../../utils/platform"
import { StateButton } from "../Button"

type Props = {
  title: string
  location: string
  price: number
  variant?: "pending" | "inProgress" | "done"
  stateButton?: boolean
  onPress?: () => void
  containerStyle?: ViewStyle
}

const Card = ({
  title,
  location,
  price,
  variant = "pending",
  onPress,
  stateButton = false,
  containerStyle,
}: Props) => {
  const child = (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.title(variant)}>{title}</Text>
      <View style={styleKit.layout.containerWithHorizontalFlex}>
        <Ionicons name="location-outline" style={styles.location(variant)} />
        <Text style={styles.location(variant)}> 배달 장소 : {location}</Text>
      </View>
      <View style={styleKit.layout.containerWithHorizontalFlex}>
        <Text style={styles.tip(variant)}>배달팁 : {price}원</Text>
        {variant !== "pending" ? (
          <View style={styles.flagContainer(variant)}>
            <Text style={styles.flagText}>
              {variant === "inProgress" ? "배달 중" : "배달 완료"}
            </Text>
          </View>
        ) : stateButton ? (
          <StateButton
            containerStyle={styles.stateButtonContainer}
            status={variant}
            onPress={() => null}
          />
        ) : null}
      </View>
    </View>
  )

  return isAOS ? (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple(
        styleKit.colors.gray100,
        false,
        undefined,
      )}
      onPress={onPress}
    >
      {child}
    </TouchableNativeFeedback>
  ) : (
    <Pressable
      style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
      onPress={onPress}
    >
      {child}
    </Pressable>
  )
}

export default Card
