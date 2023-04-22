import axios from "axios"
import { MutableRefObject, Dispatch, SetStateAction } from "react"
import { IMessage, GiftedChat } from "react-native-gifted-chat"
import uuid from "react-native-uuid"
import { getToken } from "../utils/secureStore/secureStore"
import { BASE_URL, SOCKET_URL } from "../config"

export const fetchChatroomId = (postId: number, jwt: string) => {
  return axios
    .get(`${BASE_URL}/chat/checkChattingRoom/${postId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
    .then((res) => {
      const data = res.data.data
      const id: number | null = data.id
      return id
    })
    .catch((e) => {
      console.log("Error fetching chatroom id with post id")
      console.log(e)
    })
}

export const createChatroom = (postId: number, jwt: string) => {
  return axios
    .post(
      `${BASE_URL}/chat`,
      {
        orderId: postId,
      },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      },
    )
    .then((res) => {
      const data = res.data.data as { id: number; name: string }
      return data.id
    })
    .catch((e) => {
      console.log("error creating chatroom")
      console.log(e)
    })
}

export const fetchChattingHistory = (roomId: number, jwt: string) => {
  return axios
    .get(`${BASE_URL}/chat/getChattings/${roomId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
    .then((res) => {
      const data: {
        id: number
        sender: string
        message: string
        createAt: Date
      }[] = res.data.data

      const filteredData = data.filter((d) => d.message !== "")

      const history = filteredData.map(
        (msg): IMessage => ({
          _id: msg.id,
          text: msg.message,
          createdAt: msg.createAt,
          user: {
            _id: msg.sender,
          },
        }),
      )
      // console.log(history)
      return history
    })
    .catch((e) => {
      console.log("error fetching chat history")
      console.log(e)
    })
}

const createOnMessage = (setMessages: Dispatch<SetStateAction<IMessage[]>>) => {
  return (ev: MessageEvent) => {
    console.log("onmesseag!!!!")
    const parsed: {
      message: string
      roomId: number
      type: "ENTER" | "TALK"
    } = JSON.parse(ev.data)
    console.log("parsed!!!")
    const newMessage: IMessage = {
      _id: uuid.v4() as string,
      text: parsed.message,
      createdAt: new Date(),
      user: {
        _id: 1, //
      },
    }
    if (parsed.type === "ENTER" && parsed.message === "") return
    setMessages((previousMessages) => [...previousMessages, newMessage])
    console.log(parsed)
  }
}

export const connect = (
  ws: MutableRefObject<WebSocket | null>,
  roomId: number,
  messagesSetter: Dispatch<SetStateAction<IMessage[]>>,
  joiningMessage: string = "",
) => {
  const onMessage = createOnMessage(messagesSetter)

  ws.current = new WebSocket(SOCKET_URL)
  ws.current.onopen = () => {
    console.log("onOpen!!")
    sendMessage(ws, joiningMessage, roomId, "ENTER")
  }
  ws.current.onmessage = onMessage
  ws.current.onerror = (ev: Event) => {
    console.log("ws error: " + ev)
  }
}
export const disconnect = (ws: MutableRefObject<WebSocket | null>) => {
  console.log("closed")
  ws.current?.close()
}

export const sendMessage = (
  ws: MutableRefObject<WebSocket | null>,
  body: string,
  roomId: number,
  action: "ENTER" | "TALK",
) => {
  getToken().then((tok) => {
    console.log(action)
    console.log(roomId)
    console.log(body)
    console.log(tok)
    const stringifiedMessage = JSON.stringify({
      type: action,
      roomId,
      message: body,
      token: tok,
    })
    console.log(stringifiedMessage)
    ws.current?.send(stringifiedMessage)
  })
}
