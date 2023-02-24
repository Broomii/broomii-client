import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"

import { BASE_URL } from "../../config"

export type PostType = {
  id?: number
  title: string
  deliveryAddress: string
  nickName?: string
  storeName: string
  totalPrice: number
  deliveryPay: number
  deliveryStatus?: "pending" | "inProgress" | "done"
  requirement: string
  flag?: number
}

export const fetchSinglePost = createAsyncThunk(
  "singlePost/fetchSinglePost",
  async (data: { id: number; jwt: string }, { rejectWithValue }) => {
    // console.log(data.id, data.jwt)
    const result = axios
      .get(`${BASE_URL}/orders/get/${data.id}`, {
        headers: {
          Authorization: `Bearer ${data.jwt}`,
        },
      })
      .then((res) => {
        const typedData: PostType = res.data.data
        return typedData
      })
      .catch((e) => {
        console.log(e)
        rejectWithValue({})
      })

    return result
  },
)

export const createSinglePost = createAsyncThunk(
  "singlePost/createSinglePost",
  async ({ jwt, post }: { jwt: string; post: PostType }, thunkApi) => {
    console.log(post)
    console.log(jwt)
    const result = axios
      .post(`${BASE_URL}/orders/create`, post, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) => {
        const data = res.data.data
        return data
      })
      .catch((e) => {
        console.log(e)
        return thunkApi.rejectWithValue(0)
      })

    return result
  },
)

export const fetchDefaultAddress = createAsyncThunk(
  "singlePost/fetchDefaultAddress",
  async (jwt: string, { rejectWithValue }) => {
    const result = axios
      .get(`${BASE_URL}/members/getDefaultAddress`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) => {
        const address: string = res.data.data
        return address
      })
      .catch((e) => {
        console.log(e)
        return rejectWithValue("")
      })

    return result
  },
)

type postStateType = {
  post: PostType
  status: "idle" | "pending" | "succeeded" | "failed"
  // defaultAddress: string
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
    flag: 0,
  },
  // defaultAddress: "",
  status: "idle",
  error: null,
}

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
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
      .addCase(createSinglePost.pending, (state, action) => {
        state.status = "pending"
      })
      .addCase(createSinglePost.fulfilled, (state, action) => {
        state.status = "succeeded"
      })
      .addCase(createSinglePost.rejected, (state, action) => {
        state.status = "failed"
      })
      .addCase(fetchDefaultAddress.pending, (state) => {
        state.status = "pending"
      })
      .addCase(fetchDefaultAddress.fulfilled, (state, action) => {
        state.status = "succeeded"
        console.log("payload: " + action.payload)
        // state.defaultAddress = action.payload as unknown as string
      })
      .addCase(fetchDefaultAddress.rejected, (state) => {
        state.status = "failed"
      })
  },
})

// export const { setBackStatus } = postSlice.actions

export default postSlice.reducer
