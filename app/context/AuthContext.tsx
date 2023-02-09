import AsyncStorage from "@react-native-async-storage/async-storage"
import React, { createContext, useEffect, useState, SetStateAction, Dispatch } from "react"
import axios from "axios"

import { BASE_URL } from "../config"

export type AuthContextType = {
  handleLogin: (email: string, password: string) => void
  handleLogout: () => void
  isLoading: boolean
  userToken: string | null
  loginErrorMessage: string
  setLoginErrorMessage: Dispatch<SetStateAction<string>>
}

type LoginResponseDataType = {
  accessToken: string
  refreshToken: string
  refreshTokenExpirationTime: number
  success: boolean
}

export const AuthContext = createContext<AuthContextType>({})

type AuthProviderProps = {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [userToken, setUserToken] = useState<string | null>(null)
  const [refreshToken, setRefreshToken] = useState()
  const [loginErrorMessage, setLoginErrorMessage] = useState("") // It includes Email Error

  const handleLogin = (email: string, password: string) => {
    setIsLoading(true)
    console.log(email, password)
    axios
      .post(`${BASE_URL}/members/login`, {
        email,
        password,
      })
      .then((res) => {
        const data: LoginResponseDataType = res.data.data
        const token = data.accessToken

        setUserToken(token)
        if (token) {
          AsyncStorage.setItem("userToken", token)
        } else {
          console.log("Error: There's NO Token in Response despite of success")
        }
      })
      .catch((e) => {
        if (e == "AxiosError: Request failed with status code 430") {
          setLoginErrorMessage("이메일 또는 비밀번호를 잘못 입력하였습니다")
        }

        console.log(`Login Error: ${e}`)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const handleLogout = () => {
    setIsLoading(true)
    setUserToken(null)
    AsyncStorage.removeItem("userToken")
    setIsLoading(false)
  }

  const printToken = () => {
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (error, stores) => {
        stores.map((result, i, store) => {
          console.log({ [store[i][0]]: store[i][1] })
          return true
        })
      })
    })
  }

  const getTokenFromLocalStorage = async () => {
    // printToken()
    try {
      setIsLoading(true)
      let token = await AsyncStorage.getItem("userToken")
      setUserToken(token)
      setIsLoading(false)
    } catch (e) {
      console.log(`is loggedin error: ${e}`)
    }
  }

  useEffect(() => {
    getTokenFromLocalStorage()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        handleLogin,
        handleLogout,
        isLoading,
        userToken,
        loginErrorMessage,
        setLoginErrorMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
