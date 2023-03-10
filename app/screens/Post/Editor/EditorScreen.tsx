import { View, Text, Alert } from "react-native"
import React, { useState, useEffect } from "react"
import { StackNavigationProp } from "@react-navigation/stack"
import { RouteProp, useNavigation } from "@react-navigation/native"
import { useSelector } from "react-redux"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

import EditorInput from "../../../components/EditorInput"

import { isAOS } from "../../../utils/platform"
import { styleKit } from "../../../style"
import styles from "./EditorScreen.styles"
import { HeaderRightCompleteButton } from "../../../components/Button"
import { PublicStackParamList } from "../../../navigation/Public/PublicScreensNavigator"

import { useAppDispatch, RootState } from "../../../redux/store"
import {
  createSinglePost,
  PostType,
  fetchDefaultAddress,
  editSinglePost,
} from "../../../redux/Post/postSlice"
import { getJWT } from "../../../utils/secureStore/secureStore"
import { notifyToRefetch } from "../../../redux/Rider/riderSlice"

type EditorScreenNavigationProp = StackNavigationProp<
  PublicStackParamList,
  "Editor"
>

type EditorProps = {
  route: RouteProp<{ params: { postToEdit: PostType } }, "params">
}

const EditorScreen = ({ route }: EditorProps) => {
  const { postToEdit } = route.params

  const dispatch = useAppDispatch()

  const navigation = useNavigation<EditorScreenNavigationProp>()

  const [title, setTitle] = useState("")
  const [storeName, setStoreName] = useState("")
  const [address, setAddress] = useState("")
  const [totalPrice, setTotalPrice] = useState("")
  const [tip, setTip] = useState("")
  const [requirements, setRequirments] = useState("")

  const checkEmpty = (info: string) => {
    return info.trim() === ""
  }

  const getAddress = () => {
    getJWT((jwt) =>
      dispatch(fetchDefaultAddress(jwt))
        .unwrap()
        .then((res) => {
          setAddress(res)
        }),
    )
  }

  const handleGetDefaultAddressButtonPressed = () => {
    getAddress()
  }

  const handleSubmit = () => {
    const isTitleEmpty = checkEmpty(title)
    const isStoreNameEmpty = checkEmpty(storeName)
    const isAddressEmpty = checkEmpty(address)
    const isTotalPriceEmpty = checkEmpty(totalPrice)
    const isTipEmpty = checkEmpty(tip)

    const isTipGreaterThantOrEqaulToThousand = Number(tip) >= 1000

    if (
      !isTitleEmpty &&
      !isStoreNameEmpty &&
      !isAddressEmpty &&
      !isTotalPriceEmpty &&
      !isTipEmpty &&
      isTipGreaterThantOrEqaulToThousand
    ) {
      const postToUpload: PostType = {
        title,
        storeName,
        deliveryAddress: address,
        totalPrice: Number(totalPrice),
        deliveryPay: Number(tip),
        requirement: requirements,
      }

      const actionToPerform = (isEditMode: boolean, jwt: string) => {
        if (isEditMode) {
          const editedPost = { ...postToUpload, id: postToEdit.id }
          return editSinglePost({ jwt, post: editedPost })
        } else {
          return createSinglePost({ jwt, post: postToUpload })
        }
      }

      const isEditMode = postToEdit !== null

      getJWT((jwt) =>
        dispatch(
          // createSinglePost({ jwt, post: postToCreate })
          actionToPerform(isEditMode, jwt),
        )
          .unwrap()
          .then((id) => {
            dispatch(notifyToRefetch())
            navigation.reset({
              index: 0,
              routes: [{ name: "BottomTabBar" }],
            })
            navigation.navigate("Post", { id })
          }),
      )
      // dispatch.then.unwrap((res) => { navigation.navigate("Post", {id: res}) })
      console.log("fetch!!")
    } else {
      // console.log(!isTipGreaterThantOrEqaulToThousand)

      if (!isTipGreaterThantOrEqaulToThousand && !isTipEmpty) {
        Alert.alert(
          "???????????? ?????? ???????????? ????????????",
          "???????????? 1000??? ??????????????? ?????????",
          [{ text: "??????" }],
        )
      } else {
        Alert.alert("???????????? ????????? ????????????", "?????? ????????? ???????????????", [
          { text: "??????" },
        ])
      }
    }
  }

  const fillEditorWithPost = () => {
    setTitle(postToEdit.title)
    setStoreName(postToEdit.storeName)
    setAddress(postToEdit.deliveryAddress)
    setTotalPrice(`${postToEdit.totalPrice}`)
    setTip(`${postToEdit.deliveryPay}`)
    setRequirments(postToEdit.requirement)
  }

  useEffect(() => {
    if (postToEdit == null) {
      getAddress()
    } else {
      fillEditorWithPost()
    }
  }, [])

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderRightCompleteButton title="??????" onPress={handleSubmit} />
      ),
    })
  }, [title, storeName, address, totalPrice, tip, requirements])

  return (
    <KeyboardAwareScrollView
      style={[styleKit.layout.containerWithPadding, styles.container]}
    >
      <EditorInput
        placeholder="?????? (????????? ?????? ???????????? ??????????????????)"
        value={title}
        onChangeText={(newTitle) => setTitle(newTitle)}
      />
      <EditorInput
        placeholder="?????????"
        value={storeName}
        onChangeText={(newStore) => setStoreName(newStore)}
      />
      <EditorInput
        placeholder="?????? ??????"
        value={address}
        onChangeText={(newAddress) => setAddress(newAddress)}
        variant="withButton"
        onButtonPress={handleGetDefaultAddressButtonPressed}
      />
      <EditorInput
        placeholder="?????? ??????"
        value={totalPrice}
        onChangeText={(newTotalPrice) => setTotalPrice(newTotalPrice)}
        keyboardType="numeric"
      />
      <EditorInput
        placeholder="??? ????????? (1000??? ??????)"
        value={tip}
        onChangeText={(newTip) => {
          setTip(newTip)
        }}
        keyboardType="numeric"
      />
      <EditorInput
        variant="multiline"
        placeholder={`?????? ??????????????? ???????????? ??????????????????.\nex) ????????? 2??? ?????? ???????????????`}
        value={requirements}
        onChangeText={(newRequirements) => setRequirments(newRequirements)}
        scrollEnabled={false}
        outerContainerStyle={{ minHeight: 240 }}
      />
    </KeyboardAwareScrollView>
  )
}

export default EditorScreen
