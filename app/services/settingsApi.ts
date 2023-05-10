import axios from "axios"
import { BASE_URL } from "../config"

export const fetchMyProfile = async (jwt: string) => {
  return await axios
    .get(`${BASE_URL}/mypage/get`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
    .then((res) => {
      const data: { nickName: string; department: string } = res.data.data
      return data
    })
    .catch((e) => {
      console.log(e)
    })
}

export const fetchMyProfileAsync = async (jwt: string) => {
  try {
    const res = await axios.get(`${BASE_URL}/mypage/get`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })

    const data: { nickName: string; department: string } = res.data.data
    return data
  } catch (e) {
    console.log(e)
  }
}

export const fetchMyInfo = async (jwt: string) => {
  return await axios
    .get(`${BASE_URL}/mypage/get`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
    .then((res) => {
      const data: {
        name: string
        nickName: string
        department: string
        defaultDeliveryAddress: string
      } = res.data.data
      return data
    })
    .catch((e) => {
      console.log(e)
    })
}

export const updateMyInfo = async (
  jwt: string,
  name: string,
  username: string,
  address: string,
  major: string,
) => {
  console.log(name)
  console.log(username)
  console.log(major)
  console.log(address)
  return await axios
    .put(
      `${BASE_URL}/mypage/editProfile`,
      {
        name,
        nickName: username,
        department: major,
        defaultDeliveryAddress: address,
      },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      },
    )
    .then(() => {
      console.log("success")
    })
    .catch((e) => {
      console.log(e)
    })
}
