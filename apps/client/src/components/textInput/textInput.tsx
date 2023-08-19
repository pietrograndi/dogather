import { FormEvent } from "react"
import { elementsFamily, inputAtom, isUniqueInputValue } from "../../data/atoms"
import { useAtom } from 'jotai'
import { nanoid } from "nanoid"

type Props = {
  add: (id:string) => void
}

export const TextInput:React.FC<Props> = ({add}) => {
  const [value, setValue] = useAtom(inputAtom)
  const [isUnique] = useAtom(isUniqueInputValue)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(!isUnique ) return
    const id = nanoid()
    elementsFamily({id, title: value })
    setValue('')
    add(id)
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

