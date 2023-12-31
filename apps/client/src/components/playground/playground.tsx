import { TextInput } from "../textInput"
import { DraggableList } from "../draggableList"
import { useAtom, useSetAtom } from "jotai"
import { elementListAtom, provaAtom, serializeDeserializeAtom } from "../../data/atoms"
import { LocalStorageActionType } from "../../types"
import { STORAGE_KEYS } from "../../utils/app_constants"
import { useEffect, useState } from "react"


export const Playground:React.FC = () => {
  const [autoSave, setAutoSave ] = useState(false)
  const [prova] = useAtom(provaAtom)
  const [,dispatch] = useAtom(serializeDeserializeAtom)
  
  useEffect(() => {
    const handleDeserialize = () => {
      dispatch({
        type: LocalStorageActionType.DESERIALIZE,
        callback: (res:string) => {
          console.log(res)
          setAutoSave(true)
        }
      })
    }
    !autoSave && handleDeserialize()
  },[dispatch,autoSave])

  useEffect(() => {
    const handleSerialize = () => {
      dispatch({
        type: LocalStorageActionType.SERIALIZE, 
        callback: (value:string) => { localStorage.setItem(STORAGE_KEYS.LOCAL_STORAGE_ELEMENTS,value)}})
    }
    autoSave && handleSerialize()
  },[prova, autoSave, dispatch ])

  const setElementList = useSetAtom(elementListAtom)
  
  const handleNewItem = (id:string) => {
    setElementList(prev => [...prev, id])
  }
  
  const handleRemoveItem = (id:string) => {
    setElementList(prev => prev.filter(item => item !== id))
  }
  

  return (
    <div>
      <TextInput add={handleNewItem} />
      <DraggableList remove={handleRemoveItem}/>
    </div>
  )
} 