import { useCollabContext } from "../../collab/collabContext"


export const Collabo = () => {
  const { startCollaboration, roomId } = useCollabContext()
  return <div>
    {!roomId && <button onClick={startCollaboration} >start collaboration</button>}
    {roomId && <span>connecting</span>}
  </div>
}