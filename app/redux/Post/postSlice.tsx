import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"

import { BASE_URL } from "../../config"
import { transformDeliveryStatus } from "../../utils/converters"
import { fetchSinglePost as fetchSinglePostService } from "../../services/postApi"

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
  fetchSinglePostService,
)

export const createSinglePost = createAsyncThunk(
  "singlePost/createSinglePost",
  async ({ jwt, post }: { jwt: string; post: PostType }, thunkApi) => {
    // console.log(post)
    // console.log(jwt)
    const result = await axios
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
    const result = await axios
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

export const deleteSinglePost = createAsyncThunk(
  "singlePost/deleteSinglePost",
  async ({ jwt, id }: { jwt: string; id: number }, { rejectWithValue }) => {
    const result = await axios
      .delete(`${BASE_URL}/orders/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then(() => {
        console.log("success")
        return true
      })
      .catch((e) => {
        console.log(e)
        return rejectWithValue(false)
      })

    return result
  },
)

export const editSinglePost = createAsyncThunk(
  "singlePost/editSinglePost",
  async ({ jwt, post }: { jwt: string; post: PostType }, thunkApi) => {
    console.log("createThunk")
    console.log(post)
    console.log(jwt)
    const result = axios
      .put(`${BASE_URL}/orders/edit`, post, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) => {
        const data = res.data.data
        console.log("then")
        console.log(data)
        return data
      })
      .catch((e) => {
        console.log(e)
        return thunkApi.rejectWithValue(0)
      })

    return result
  },
)

export const changeDeliveryStatus = createAsyncThunk(
  "singlePost/changeDeliveryStatus",

  async (
    {
      jwt,
      id,
      status,
    }: { jwt: string; id: number; status: "pending" | "inProgress" | "done" },
    thunkApi,
  ) => {
    const result = await axios
      .put(
        `${BASE_URL}/orders/editDeliveryStatus`,
        {
          id,
          deliveryStatus:
            status === "pending"
              ? "deliverable"
              : status === "inProgress"
              ? "inDelivery"
              : "deliveryComplete",
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        },
      )
      .then((res) => {
        const data = res.data.data
        return data
      })
      .catch((e) => {
        console.log(e)
        return thunkApi.rejectWithValue(0)
      })

    return status
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
      .addCase(deleteSinglePost.pending, (state) => {
        state.status = "pending"
      })
      .addCase(deleteSinglePost.fulfilled, (state) => {
        state.status = "succeeded"
      })
      .addCase(deleteSinglePost.rejected, (state) => {
        state.status = "failed"
      })
      .addCase(editSinglePost.pending, (state) => {
        state.status = "pending"
      })
      .addCase(editSinglePost.fulfilled, (state) => {
        state.status = "succeeded"
      })
      .addCase(editSinglePost.rejected, (state) => {
        state.status = "failed"
      })
      .addCase(changeDeliveryStatus.pending, (state) => {
        state.status = "pending"
      })
      .addCase(changeDeliveryStatus.fulfilled, (state, action) => {
        state.status = "succeeded"
        const status = action.payload as unknown as
          | "pending"
          | "inProgress"
          | "done"

        state.post.deliveryStatus = status
      })
      .addCase(changeDeliveryStatus.rejected, (state) => {
        state.status = "failed"
      })
  },
})

// export const { setBackStatus } = postSlice.actions

export default postSlice.reducer
