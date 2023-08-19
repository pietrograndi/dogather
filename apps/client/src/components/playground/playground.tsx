import { TextInput } from "../textInput"
import { DraggableList } from "../draggableList"
import { useAtom, useSetAtom } from "jotai"
import { elementListAtom, serializeDeserializeAtom } from "../../data/atoms"
import { LocalStorageActionType } from "../../types"
import { STORAGE_KEYS } from "../../utils/app_constants"

export const Playground = () => {
  const [,dispatch] = useAtom(serializeDeserializeAtom)
  const setElementList = useSetAtom(elementListAtom)
  
  const handleNewItem = (id:string) => {
    setElementList(prev => [...prev, id])
  }
  
  const handleRemoveItem = (id:string) => {
    setElementList(prev => prev.filter(item => item !== id))
  }

  const handleSerialize = () => {
    dispatch({
      type: LocalStorageActionType.SERIALIZE, 
      callback: (value:string) => { localStorage.setItem(STORAGE_KEYS.LOCAL_STORAGE_ELEMENTS,value)}  })
  }
  
  const handleDeserialize = () => {
    dispatch({
      type: LocalStorageActionType.DESERIALIZE,
      value: ''
    })
  }

  return (
    <div>
      <TextInput add={handleNewItem} />
      <DraggableList remove={handleRemoveItem}/>
      <button onClick={handleSerialize}>save</button>
      <button onClick={handleDeserialize}>load</button>
    </div>
  )
} 