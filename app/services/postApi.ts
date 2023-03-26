import axios from "axios"

import { PostType } from "../redux/Post/postSlice"
import { BASE_URL } from "../config"
import { transformDeliveryStatus } from "../utils/converters"

export const fetchSinglePost = async ({
  id,
  jwt,
}: {
  id: number
  jwt: string
}) => {
  // console.log(id, jwt)
  const result = await axios
    .get(`${BASE_URL}/orders/get/${id}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
    .then((res) => {
      const data = res.data.data
      const transformedDeliveryStatus = transformDeliveryStatus(
        data.deliveryStatus,
      )
      const typedData: PostType = {
        ...data,
        deliveryStatus: transformedDeliveryStatus,
        id,
      }
      return typedData
    })
    .catch((e) => {
      console.log("Error fetching single post")
      console.log(e)
      throw new Error(e)
    })

  return result
}
