import { useCollabContext } from "../../collab/collabContext"


export const Collabo = () => {
  const { startCollaboration, roomId, isConnected } = useCollabContext()
  return <div>
    {!roomId && <button onClick={startCollaboration} >start collaboration</button>}
    {roomId && <span>connecting...</span>}
    <div>
      <pre>connection status: {JSON.stringify(isConnected)}</pre>
    </div>
  </div>
}