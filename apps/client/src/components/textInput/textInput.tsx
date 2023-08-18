import { FormEvent } from "react"
import { elementsFamily, inputAtom, isUniqueInputValue, elementListAtom } from "../../data/atoms"
import { useAtom, useSetAtom } from 'jotai'
import { nanoid } from "nanoid"

export const TextInput:React.FC = () => {
  const [value, setValue] = useAtom(inputAtom)
  const setTodos = useSetAtom(elementListAtom)
  const [isUnique] = useAtom(isUniqueInputValue)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(!isUnique ) return
    const id = nanoid()
    elementsFamily({id, title: value })
    setTodos(prev  => [...prev, id])
    setValue('')
  }

  const change = (e:React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return <form onSubmit={onSubmit}>
    <input type="text" value={value} onChange={change} />
    <button type="submit" disabled={value === '' || !isUnique }>add</button>
    {!isUnique && <span>already present</span>}
  </form>
}

