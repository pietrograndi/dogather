import { useAtom} from "jotai"
import { elements, todoList } from "../../data/atoms"
import {  TodoItem } from "../todoItem"

export const DraggableList = () => {
  const [todos, setTodos] = useAtom(todoList)

  const deleteItem = (id:string) => {
    setTodos(prev => prev.filter(item => item !== id))
    elements.remove({id})
  }

  return ( <div> 
    {
      todos.map(id => <TodoItem id={id} key={id} remove={deleteItem} />)
    }
  </div>)
}