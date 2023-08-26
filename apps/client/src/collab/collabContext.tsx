import { nanoid } from "nanoid"
import { createContext, useContext } from "react"
import { StringParam, useQueryParam } from 'use-query-params'
import { useSocket } from "../hooks/useSocketIo"
type Props = {
  children: React.ReactNode
}

type ContextValues = {
  startCollaboration: VoidFunction
  roomId: string | undefined
  isConnected: boolean
}

const CollabContext = createContext<ContextValues>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  startCollaboration: () => {},
  roomId: undefined,
  isConnected: false
})


export const CollabContextComponent = ({children}:Props) => {
  const [room, setRoom ] = useQueryParam('room',StringParam)
  const { socket, isConnected } = useSocket(room || undefined)

  const startCollaboration = () => {
    setRoom(nanoid())
  }

  const value: ContextValues = {
    isConnected,
    startCollaboration,
    roomId: room || undefined
  }

  return <CollabContext.Provider value={value}>
    <pre>current roomID: {room}</pre>
    {children}
  </CollabContext.Provider>
}

export const useCollabContext = () => useContext(CollabContext)