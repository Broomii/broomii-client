import {
  Stomp,
  StompConfig,
  Client,
  frameCallbackType,
  CompatClient,
} from "@stomp/stompjs"
import SockJS from "sockjs-client"
import { getToken } from "../utils/secureStore/secureStore"
import { SOCK_URL, STOMP_URL } from "../config"

let stompClient: Client
// let stompClient: CompatClient

const connect = () => {
  const stompConfig: StompConfig = {
    connectHeaders: {},
    brokerURL: STOMP_URL,
    debug: (str) => {
      console.log(str)
    },
    reconnectDelay: 5000,
    forceBinaryWSFrames: true,
    appendMissingNULLonIncoming: true,
    onConnect: onConnected,
    onStompError: onError,
  }

  stompClient = new Client(stompConfig)
}

// const connect = () => {
//   const socket = new SockJS(SOCK_URL)
//   const stompClient = Stomp.over(() => socket)

//   stompClient.connect({}, onConnected, onStompError)
// }

const onConnected = () => {}

// const onConnected = () => {
//   console.log("onConnected")
//   // Subscribe to the Public Topic
//   stompClient.subscribe("/chat/getChattings/1", onMessageReceived)

//   // Tell your username to the server
//   stompClient.send("", {}, JSON.stringify({ sender: "Ali", type: "ENTER" }))
// }

// const onMessageReceived = (payload: any) => {
//   console.log("onMessageReceived")
//   var message = JSON.parse(payload.body)
// }

const onError: frameCallbackType = (frame) => {
  console.log("Additional details: " + frame.body)
}

const sendMessage = () => {
  stompClient.publish({
    destination: "",
    body: JSON.stringify({
      type: "ENTER",
      roomId: 1,
      sender: "멋진지혁2",
      message: "ㅏㅏㅏㅏㅏㅏㅏㅏㅏ",
    }),
  })
}

// https://stackoverflow.com/questions/68297252/stomp-and-sockjs-in-a-react-native
// https://stackoverflow.com/questions/70530384/web-socket-connections-with-stomp-stompjs-in-react-native
