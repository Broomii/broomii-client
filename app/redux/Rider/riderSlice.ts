import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"

import { TEST_URL } from "../../config"

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

const transformDeliveryStatus = (
  status: "deliverable" | "inDelivery" | "deliveryComplete",
): "pending" | "inProgress" | "done" => {
  switch (status) {
    case "deliverable":
      return "pending"
    case "inDelivery":
      return "inProgress"
    case "deliveryComplete":
      return "done"
    default:
      return "pending"
  }
}

export const fetchGigList = createAsyncThunk("rider/fetchGigList", async () => {
  const result = await axios
    .get(`${TEST_URL}/orders`)
    .then((res) => {
      const data = res.data.data
      return data
    })
    .then((data) => {
      const newData = data.map((gig) => {
        const id = gig.id
        const attr = gig.attributes

        const deliveryStatus: "pending" | "inProgress" | "done" =
          transformDeliveryStatus(attr.deliveryStatus)

        const newGig: GigCellType = {
          id,
          title: attr.title,
          deliveryAddress: attr.deliveryAddress,
          deliveryPay: attr.deliveryPay,
          deliveryStatus,
        }

        return newGig
      })
      return newData
    })
    .catch((e) => {
      console.log(e)
    })

  // console.log(result)
  return result
})

type riderStateType = {
  gigList: GigCellType[]
  filteredGigList: GigCellType[]
  status: "idle" | "pending" | "succeeded" | "failed"
  error: string | null
}

const initialState: riderStateType = {
  gigList: [],
  filteredGigList: [],
  status: "idle",
  error: null,
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
  },
  extraReducers(builder) {
    builder
      .addCase(fetchGigList.pending, (state, action) => {
        state.status = "pending"
      })
      .addCase(fetchGigList.fulfilled, (state, action) => {
        state.status = "succeeded"
        const newGigs = action.payload

        state.gigList = state.gigList.concat(newGigs)
        state.filteredGigList = state.gigList
      })
      .addCase(fetchGigList.rejected, (state, action) => {
        state.status = "failed"
      })
  },
})

export const { filterGigs } = riderSlice.actions

export default riderSlice.reducer
