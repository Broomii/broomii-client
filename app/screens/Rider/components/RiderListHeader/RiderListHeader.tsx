import { View, Text, Switch } from "react-native"
import React from "react"

import styles from "./RiderListHeader.styles"
import { styleKit } from "../../../../style"
import { isAOS } from "../../../../utils/platform"

type RiderListHeaderProps = {
  isSwitchOn: boolean
  onValueChange: () => void
}

const RiderListHeader = ({
  isSwitchOn,
  onValueChange,
}: OrderListHeaderProps) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.buttonConatiner}>
        <Text style={styles.buttonLabel}>배달 가능만</Text>
        <Switch
          value={isSwitchOn}
          onValueChange={onValueChange}
          trackColor={{ true: styleKit.colors.brand }}
          thumbColor={styleKit.colors.primaryInvert}
        />
      </View>
    </View>
  )
}

export default RiderListHeader
