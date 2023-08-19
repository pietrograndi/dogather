import { useAtom} from "jotai"
import { elementsFamily, elementListAtom } from "../../data/atoms"
import {  TodoItem } from "../todoItem"

type Props = {
  remove: (id:string) => void
}

export const DraggableList:React.FC<Props> = ({remove}) => {
  const [todos] = useAtom(elementListAtom)

  const deleteItem = (id:string) => {
    elementsFamily.remove({id})
    remove(id)
  }

  return ( <div> 
    {
      todos.map(id => <TodoItem id={id} key={id} remove={deleteItem} />)
    }
  </div>)
}