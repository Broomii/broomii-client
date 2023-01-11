import { SetStateAction, Dispatch } from "react"

export const checkFormEmpty = (
  input: string,
  setErrorMessage: Dispatch<SetStateAction<string>>,
  errorMessage: string,
): void => {
  if (input.trim() === "") {
    setErrorMessage(errorMessage)
  } else {
    setErrorMessage("")
  }
}
