import { createContext, useContext, useEffect } from "react";
import { useQueryParam, StringParam } from 'use-query-params'
import { useSocket } from "../hooks/useSocketIo";

type CollaboContext = {
  isConnected: boolean
}

const CollaborationContext = createContext<CollaboContext>({
  isConnected: false
})

type Props = {
  children: React.ReactNode
}

export const CollaborationContextProvider:React.FC<Props> = ({children}) => {
  const [roomId] = useQueryParam('room', StringParam)
  const {socket, isConnected } = useSocket(roomId || null)

  console.log({roomId})
  console.log({isConnected})

  return <CollaborationContext.Provider value={{
    isConnected
  }}>{children}</CollaborationContext.Provider>
}

export const useCollaboration = () => useContext(CollaborationContext)