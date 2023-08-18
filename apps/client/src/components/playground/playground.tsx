import { TextInput } from "../textInput"
import { DraggableList } from "../draggableList"
import { useAtom } from "jotai"
import { serDeser } from "../../data/atoms"
import { setDataToLocalStorage } from "../../data/localData"
import { LocalStorageActionType } from "../../types"

export const Playground = () => {
  const [,dispatch ] = useAtom(serDeser)
  
  dispatch({ type: LocalStorageActionType.SERIALIZE, callback: setDataToLocalStorage})
  
  return (
    <div>
      <TextInput />
      <DraggableList />
    </div>
  )
} 