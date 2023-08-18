import { useAtom } from "jotai"
import { elements } from "../../data/atoms"

type Props = {
  id:string
  remove: (id:string) => void
}

export const TodoItem:React.FC<Props> = ({ id, remove }) => {
  const [item, setItem] = useAtom(elements({id}))
  const toggleCompleted = () => setItem({...item, completed: !item.completed})
  
  return (<div>
    <input type="checkbox"
    checked={item.completed}
    onChange={toggleCompleted} />
    <span style={{textDecoration: item.completed ? 'line-through' : ''}}>{item.title}</span>
    <button onClick={() => remove(id)} >remove</button>
  </div>)
}