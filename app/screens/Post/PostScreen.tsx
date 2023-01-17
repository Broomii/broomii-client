import { View } from "react-native"
import React from "react"
import { Ionicons } from "@expo/vector-icons"

import Text from "../../components/Text"
import { Button } from "../../components/Button"
import Profile from "../../components/Profile"

import { styleKit } from "../../style"
import styles from "./PostScreen.styles"
import { useSafeAreaInsets } from "react-native-safe-area-context"

type Props = {}

const PostScreen = (props: Props) => {
  const BOTTOM_INSET: number = useSafeAreaInsets().bottom

  return (
    <>
      <View style={[styleKit.layout.containerWithPadding, styles.container]}>
        <Profile />

        <View style={styles.titleSection}>
          {/* Button */}
          <Text style={styles.title}>삼각자 배달 원합니다</Text>
          <Text style={styles.time}>20분 전</Text>
          <Text style={styles.shopName}>매장명: 아무 문구점</Text>
        </View>
        {/* Content Section */}
        <View style={styles.contentCotainer}>
          <Text style={styles.content}>
            가나다라마바사아자차가 대충 내용 내용 가나다라마사맛있겠다 r가나다란알낭란ㅁㅇ람ㄴ앎ㄴ알 스크롤뷰 넣는 거 까먹지 말 것
          </Text>
        </View>
      </View>
      {/* Sticky Button Section */}
      <View
        style={[
          styleKit.layout.containerWithHorizontalFlex,
          styles.buttonSection,
          { bottom: BOTTOM_INSET },
        ]}
      >
        <View>
          <View style={styleKit.layout.containerWithHorizontalFlex}>
            <Ionicons style={styles.tipAndLocation} name="location-outline" />
            <Text style={styles.tipAndLocation}>배달 장소</Text>
          </View>
          <Text style={styles.tipAndLocationValue}>향설 생활관 앞</Text>
        </View>
        <View>
          <Text style={styles.tipAndLocation}>배달팁</Text>
          <Text style={styles.tipAndLocationValue}>2000원</Text>
        </View>
        <Button
          title="진행 중인 채팅 보기"
          variant="smallButton"
          onPress={() => null}
        />
      </View>
    </>
  )
}

export default PostScreen
