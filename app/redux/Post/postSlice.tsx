import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"

import { TEST_URL } from "../../config"

export type PostType = {
  id: number
  title: string
  deliveryAddress: string
  nickName: string
  storeName: string
  totalPrice: number
  deliveryPay: number
  deliveryStatus: "pending" | "inProgress" | "done"
  requirement: string
}

export const fetchSinglePost = createAsyncThunk(
  "singlePost/fetchSinglePost",
  async (id: number) => {
    const result = axios
      .get(`${TEST_URL}/orders/${id}`)
      .then((res) => {
        const data = res.data.data
        return data
      })
      .then((data) => {
        const id = data.id
        const attr = data.attributes

        const {
          title,
          deliveryAddress,
          nickName,
          storeName,
          totalPrice,
          deliveryPay,
          deliveryStatus,
          requirement,
        } = attr

        const singlePostData: PostType = {
          id,
          title,
          deliveryAddress,
          nickName,
          storeName,
          totalPrice,
          deliveryPay,
          deliveryStatus,
          requirement,
        }
        console.log(singlePostData)
        return singlePostData
      })
      .catch((e) => {
        console.log(e)
      })
      
    return result
  },
)

type postStateType = {
  post: PostType
  status: "idle" | "pending" | "succeeded" | "failed"
  error: string | null
}

const initialState: postStateType = {
  post: {
    id: -1,
    title: "",
    deliveryAddress: "",
    nickName: "",
    storeName: "",
    totalPrice: 0,
    deliveryPay: 0,
    deliveryStatus: "pending",
    requirement: "",
  },
  status: "idle",
  error: null,
}

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setBackStatus(state) {
      state.status = "idle"
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchSinglePost.pending, (state, action) => {
        state.status = "pending"
      })
      .addCase(fetchSinglePost.fulfilled, (state, action) => {
        state.status = "succeeded"
        const newPost = action.payload as PostType

        state.post = newPost
      })
      .addCase(fetchSinglePost.rejected, (state, action) => {
        state.status = "failed"
      })
  },
})

export const { setBackStatus } = postSlice.actions

export default postSlice.reducer
