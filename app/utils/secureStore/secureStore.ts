import * as SecureStore from "expo-secure-store"

export const getJWT = async (completionHandler: (jwt: string) => void) => {
  const result = await SecureStore.getItemAsync("userToken")
  if (result) {
    completionHandler(result)
  } else {
    console.log("Error fetcing Gig Lists: There's no JWT")
  }
}
