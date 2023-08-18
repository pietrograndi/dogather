import { useAtom} from "jotai"
import { elementsFamily, elementListAtom } from "../../data/atoms"
import {  TodoItem } from "../todoItem"

export const DraggableList = () => {
  const [todos, setTodos] = useAtom(elementListAtom)

  const deleteItem = (id:string) => {
    setTodos(prev => prev.filter(item => item !== id))
    elementsFamily.remove({id})
  }

  return ( <div> 
    {
      todos.map(id => <TodoItem id={id} key={id} remove={deleteItem} />)
    }
  </div>)
}