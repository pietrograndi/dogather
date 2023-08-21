import { useParams } from "react-router-dom"

export const Room = () => {
  const { idRoom } = useParams()

  return (
    <div className="text-red-500">Room: {idRoom}</div>
  )
}