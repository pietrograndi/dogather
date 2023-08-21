import { nanoid } from "nanoid"
import { useQueryParam, StringParam } from 'use-query-params';

export const Navbar = () => {
  const [roomId, setRoomId] = useQueryParam('room', StringParam)

  const shareCurrentList = () => {
    setRoomId(nanoid())
  }
  
  return <div>
    {!roomId && <button onClick={shareCurrentList}>share button</button>}
  </div>
}