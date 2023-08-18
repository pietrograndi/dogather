import { useParams } from "react-router-dom"

export const Room = () => {
  const { idRoom } = useParams()

  console.log({idRoom})

  return (
    <div className="text-red-500">Room: {idRoom}</div>
  )
}