import { nanoid } from "nanoid"
import { createContext, useContext, useState } from "react"
import { StringParam, useQueryParam } from 'use-query-params'
import { useSocket } from "../hooks/useSocketIo"
type Props = {
  children: React.ReactNode
}

type ContextValues = {
  startCollaboration: VoidFunction
  disconnect: VoidFunction
  roomId: string | undefined
  isConnected: boolean
}

const CollabContext = createContext<ContextValues>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  startCollaboration: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  disconnect: () => {},
  roomId: undefined,
  isConnected: false
})


export const CollabContextComponent = ({children}:Props) => {
  const [room, setRoom ] = useQueryParam('room',StringParam)
  const [isConnected, setIsConnected ] = useState(false)
  const {disconnect: socketDisconnect} = useSocket(room || undefined, setIsConnected)

  const startCollaboration = () => {
    setRoom(nanoid())
  }

  const disconnect = () => {
    socketDisconnect()
    setRoom(null)
  }

  const value: ContextValues = {
    isConnected,
    disconnect,
    startCollaboration,
    roomId: room || undefined
  }

  return <CollabContext.Provider value={value}>
    <pre>current roomID: {room}</pre>
    {children}
  </CollabContext.Provider>
}

export const useCollabContext = () => useContext(CollabContext)