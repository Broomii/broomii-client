import { SetStateAction, Dispatch } from "react"

export const checkFormEmpty = (
  input: string,
  setErrorMessage: Dispatch<SetStateAction<string>>,
  errorMessage: string,
): boolean => {
  if (input.trim() === "") {
    setErrorMessage(errorMessage)
    return true
  } else {
    setErrorMessage("")
    return false
  }
}

export const checkInfoSubmit = (
  didSubmit: boolean,
  setErrorMessage: Dispatch<SetStateAction<string>>,
  errorMessage: string,
): boolean => {
  if (didSubmit) {
    setErrorMessage("")
    return true
  } else {
    setErrorMessage(errorMessage)
    return false
  }
}

export const checkInfoCorrect = (
  infoCorrect: boolean,
  setErrorMessage: Dispatch<SetStateAction<string>>,
  errorMessage: string,
): boolean => {
  if (infoCorrect) {
    setErrorMessage("")
    return true
  } else {
    setErrorMessage(errorMessage)
    return false
  }
}

export const checkPasswordSame = (
  password: string,
  passwordConfirm: string,
  setErrorMessage: Dispatch<SetStateAction<string>>,
): boolean => {
  if (password === passwordConfirm) {
    setErrorMessage("")
    return true
  } else {
    setErrorMessage("비밀번호가 일치하지 않습니다")
    return false
  }
}

export const isFormCorrect = (errorMessage: string): boolean => {
  return errorMessage === ""
}

export const checkPhoneNumberCorrect = (
  phone: string,
  setErrorMessage: Dispatch<SetStateAction<string>>,
): boolean => {
  const prefix = phone.substring(0, 3)
  const length = phone.length

  if (prefix === "010" && length === 11) {
    return true
  }

  setErrorMessage("전화번호의 형식이 올바르지 않습니다")
  return false
}
