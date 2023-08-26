import { createContext, useContext } from "react"

type Props = {
  children: React.ReactNode
}

const CollabContext = createContext({})


export const CollabContextComponent = ({children}:Props) => {
  return <CollabContext.Provider value={{}}>
    {children}
  </CollabContext.Provider>
}

export const useCollabContext = () => useContext(CollabContext)