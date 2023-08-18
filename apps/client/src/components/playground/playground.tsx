import { TextInput } from "../textInput"
import { DraggableList } from "../draggableList"
import { useAtom } from "jotai"
import { derivedElements } from "../../data/atoms"
import { useEffect } from "react"
import { setDataToLocalStorage } from "../../data/localData"

export const Playground = () => {
  const [derivedState] = useAtom(derivedElements)

  useEffect(() => {
    console.log('maniscalco')
  },[])
  
  useEffect(() => {
    console.log('magutto')
    setDataToLocalStorage(derivedState)
  },[derivedState])
  
  
  return (
    <div>
      <TextInput />
      <DraggableList />
    </div>
  )
} 