import { nanoid } from "nanoid"
import { createContext, useContext } from "react"
import { StringParam, useQueryParam } from 'use-query-params'
type Props = {
  children: React.ReactNode
}

type ContextValues = {
  startCollaboration: VoidFunction
  roomId: string | undefined
}

const CollabContext = createContext<ContextValues>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  startCollaboration: () => {},
  roomId: undefined
})


export const CollabContextComponent = ({children}:Props) => {
  const [room, setRoom ] = useQueryParam('room',StringParam)

  const startCollaboration = () => {
    setRoom(nanoid())
  }

  const value: ContextValues = {
    startCollaboration,
    roomId: room || undefined
  }

  return <CollabContext.Provider value={value}>
    <pre>current roomID: {room}</pre>
    {children}
  </CollabContext.Provider>
}

export const useCollabContext = () => useContext(CollabContext)