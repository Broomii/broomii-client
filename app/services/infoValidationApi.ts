import axios from "axios"
import { BASE_URL } from "../config"

export const checkUsernameAtServer = async (username: string) => {
  return await axios
    .get(`${BASE_URL}/members/checkNickname/${username}`)
    .then((res) => {
      const { message, data } = res.data

      return { message, isValid: data }
    })
    .catch((e) => {
      console.log(e)
      throw new Error(e.response.data.status)
    })
}
