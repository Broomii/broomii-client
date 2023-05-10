import AsyncStorage from "@react-native-async-storage/async-storage"
import React, {
  createContext,
  useEffect,
  useState,
  SetStateAction,
  Dispatch,
} from "react"
import axios from "axios"

import * as SecureStore from "expo-secure-store"

import { BASE_URL } from "../config"
import { getToken } from "../utils/secureStore/secureStore"

type LoginResponseDataType = {
  accessToken: string
  refreshToken: string
  refreshTokenExpirationTime: number
  success: boolean
}

export type AuthContextType = {
  handleLogin: (email: string, password: string) => void
  handleLogout: () => void
  isLoading: boolean
  userToken: string | null
  loginErrorMessage: string
  setLoginErrorMessage: Dispatch<SetStateAction<string>>
  checkUsernameAtServer: (username: string) => void
  usernameDuplicate: boolean
  checkingUsername: boolean
  usernameError: string
  setUsernameError: Dispatch<SetStateAction<string>>
  emailError: string
  setEmailError: Dispatch<SetStateAction<string>>
  checkingEmail: boolean
  checkEmailAtServer: (email: string) => void
  authCodeError: string
  setAuthCodeError: Dispatch<SetStateAction<string>>
  checkingAuthCode: boolean
  checkAuthCodeAtServer: (authCode: string) => void
  authCodeCorrect: boolean
  handleSignUp: (
    password: string,
    address: string,
    name: string,
    username: string,
    phone: string,
    // major: string,
    // isMale: boolean,
  ) => void
}

export const AuthContext = createContext<AuthContextType>({})

type AuthProviderProps = {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false) // Login, Signup Submit button
  const [userToken, setUserToken] = useState<string | null>(null)
  const [refreshToken, setRefreshToken] = useState()
  const [loginErrorMessage, setLoginErrorMessage] = useState("") // It includes Email Error

  const [usernameDuplicate, setUsernameDuplicate] = useState(true)
  const [checkingUsername, setChekcingUsername] = useState(false)
  const [usernameError, setUsernameError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [checkingEmail, setCheckingEmail] = useState(false)
  const [capturedEmail, setCapturedEmail] = useState("")
  const [authCodeError, setAuthCodeError] = useState("")
  const [checkingAuthCode, setCheckingAuthCode] = useState(false)
  const [didSubmitAuthCode, setDidSubmitAuthCode] = useState(false)
  const [authCodeCorrect, setAuthCodeCorrect] = useState(false)

  // Related to Login / Logout
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
          
          console.log(token)
          SecureStore.setItemAsync("userToken", token)
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
    SecureStore.deleteItemAsync("userToken")
    setIsLoading(false)
  }

  // Related to Sign Up

  const checkEmailAtServer = (email: string) => {
    setCheckingEmail(true)
    // console.log(email)
    axios
      .post(`${BASE_URL}/mail/sendCertificationNumber`, {
        email,
      })
      .then((res) => {
        const message = res.data.message
        console.log(message)
        setEmailError("이메일로 인증번호를 전송하였습니다")
        setCapturedEmail(email)
      })
      .catch((e) => {
        console.log(`Error: Checking Email at server failed, Reason: ${e}`)
      })
      .finally(() => {
        setCheckingEmail(false)
      })
  }

  const checkAuthCodeAtServer = (authCode: string) => {
    setCheckingAuthCode(true)
    console.log(authCode)

    if (capturedEmail.trim() === "") {
      setEmailError("다시 이메일로 인증번호를 전송하세요")
      return
    }

    axios
      .post(`${BASE_URL}/members/confirmCertification`, {
        email: capturedEmail,
        certification: authCode,
      })
      .then((res) => {
        console.log(res.data)
        setAuthCodeCorrect(true)
        setAuthCodeError("인증번호 확인을 완료하였습니다")
      })
      .catch((e) => {
        console.log(`Error Sending Auth Code - Reason: ${e}`)
        setAuthCodeError("인증번호 확인에 실패하였습니다")
      })
      .finally(() => {
        setCheckingAuthCode(false)
      })
  }

  const checkUsernameAtServer = (username: string) => {
    setChekcingUsername(true)
    axios
      .get(`${BASE_URL}/members/checkNickname/${username}`)
      .then((res) => {
        const message = res.data.data
        console.log(message)
        setUsernameError(message)

        if (message === "사용할 수 있는 닉네임 입니다.") {
          setUsernameDuplicate(false)
        } else {
          setUsernameDuplicate(true)
        }
      })
      .catch((e) => {
        console.log(e)
      })
      .finally(() => {
        setChekcingUsername(false)
      })
  }

  const printTokenFromSecureStore = async () => {
    let result = await SecureStore.getItemAsync("userToken");
    if (result) {
      alert("🔐 Here's your value 🔐 \n" + result);
      console.log(result)
    } else {
      alert('No values stored under that key.');
    }
  }

  // const getTokenFromLocalStorage = async () => {
  //   // printTokenFromSecureStore()

  //   try {
  //     setIsLoading(true)
  //     const token = await SecureStore.getItemAsync("userToken")
  //     setUserToken(token)
  //     setIsLoading(false)
  //   } catch (e) {
  //     console.log(`is loggedin error: ${e}`)
  //   }
  // }

  const handleSignUp = (
    password: string,
    address: string,
    name: string,
    username: string,
    phone: string,
  ) => {
    setIsLoading(true)
    axios
      .post(`${BASE_URL}/members/join`, {
        name,
        nickName: username,
        email: capturedEmail,
        password,
        phoneNumber: phone,
        defaultDeliveryAddress: address,
      })
      .then((res) => {
        console.log(res.data)
        const data = res.data.data
        const token = data.accessToken
        
        setUserToken(token)
        if (token) {
          SecureStore.setItemAsync("userToken", token)
          console.log("Sign up success")
        } else {
          console.log("Error: There's NO Token in Response despite of success")
        }
      })
      .catch((e) => {
        console.log(`Sign Up Error: ${e}`)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    getToken().then((tok) => {
      if (tok) {
        setUserToken(tok)
        console.log(tok)
      }
    })
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
        checkUsernameAtServer,
        usernameDuplicate,
        checkingUsername,
        usernameError,
        setUsernameError,
        emailError,
        setEmailError,
        checkingEmail,
        checkEmailAtServer,
        authCodeError,
        setAuthCodeError,
        checkingAuthCode,
        checkAuthCodeAtServer,
        authCodeCorrect,
        handleSignUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
