import { View, Image } from "react-native"
import React from "react"

import Text from "../Text"
import { styleKit } from "../../style"

import styles from "./Profile.styles"

type Props = {}

const Profile = (props: Props) => {
  return (
    <View
      style={[styleKit.layout.containerWithHorizontalFlex, styles.container]}
    >
      <View
        style={[
          styleKit.layout.containerWithHorizontalFlex,
          styles.startSection,
        ]}
      >
        <Image
          style={styles.icon}
          source={require("../../../assets/icons/profile.png")}
        />
        <View>
          <Text style={styles.username}>멍충멍충</Text>
          <Text style={styles.major}>컴퓨터 공학과</Text>
        </View>
      </View>
      <View>
        <Text style={styles.trust}>신뢰도</Text>
        <Text style={styles.trustValue}>80%</Text>
      </View>
    </View>
  )
}

export default Profile
