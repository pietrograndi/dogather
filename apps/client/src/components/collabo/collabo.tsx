import { useCollabContext } from "../../collab/collabContext"


export const Collabo = () => {
  const { startCollaboration, roomId, isConnected, disconnect } = useCollabContext()
  return <div>
    {!roomId && <button onClick={startCollaboration} >start collaboration</button>}
    {roomId && !isConnected && <span>connecting...</span>}
    <div>
      <pre>connection status: {isConnected ? '🟢': '🔴'}</pre>
    </div>
    {isConnected && <button onClick={disconnect}>disconnect</button>}
  </div>
}