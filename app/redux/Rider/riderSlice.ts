import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { transformDeliveryStatus } from "../../utils/converters"

import { BASE_URL } from "../../config"

export type GigCellType = {
  id: number
  title: string
  deliveryAddress: string
  // email: string
  // storeName: string
  // totalPrice: number
  deliveryPay: number
  deliveryStatus: "pending" | "inProgress" | "done"
  // requirement: string
}

export const fetchGigList = createAsyncThunk(
  "rider/fetchGigList",
  async (jwt: string, thunkApi) => {
    const result = await axios
      .get(`${BASE_URL}/orders/getOrderList`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) => {
        const data = res.data.data

        const newData = data.map((gig: any) => {
          const { id, title, deliveryAddress, deliveryPay, deliveryStatus } =
            gig
          const transformedDeliveryStatus: "pending" | "inProgress" | "done" =
            transformDeliveryStatus(deliveryStatus)

          const newGig: GigCellType = {
            id,
            title,
            deliveryAddress,
            deliveryPay,
            deliveryStatus: transformedDeliveryStatus,
          }
          return newGig
        }) // map

        return newData
      })
      .catch((e) => {
        console.log(e)
        return thunkApi.rejectWithValue([])
      })

    return result
  },
)

type riderStateType = {
  gigList: GigCellType[]
  filteredGigList: GigCellType[]
  status: "idle" | "pending" | "succeeded" | "failed"
  error: string | null
  shouldRefetch: boolean
}

const initialState: riderStateType = {
  gigList: [],
  filteredGigList: [],
  status: "idle",
  error: null,
  shouldRefetch: false,
}

export const riderSlice = createSlice({
  name: "rider",
  initialState,
  reducers: {
    filterGigs(state, action: PayloadAction<boolean>) {
      const isEnabled: boolean = action.payload
      const { gigList } = state
      state.filteredGigList = !isEnabled
        ? gigList.filter((gig) => gig.deliveryStatus === "pending")
        : gigList
    },
    notifyToRefetch(state) {
      state.shouldRefetch = true
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchGigList.pending, (state, action) => {
        state.status = "pending"
      })
      .addCase(fetchGigList.fulfilled, (state, action) => {
        state.status = "succeeded"
        const newGigs = action.payload
        // console.log(newGigs)
        state.gigList = newGigs
        state.filteredGigList = state.gigList
        state.shouldRefetch = false
        // console.log("hit")
      })
      .addCase(fetchGigList.rejected, (state, action) => {
        state.status = "failed"
        console.log("failed")
        state.shouldRefetch = false
      })
  },
})

export const { filterGigs, notifyToRefetch } = riderSlice.actions

export default riderSlice.reducer
