import { useNavigate } from 'react-router-dom'
import { nanoid } from 'nanoid'

export const Standalone = () => {
  const navigate = useNavigate()

  const handleShare = () => {
    navigate(`/${nanoid()}`)
  }

  return (<div>
    <div>
      <h2>standalone</h2>
      <button onClick={handleShare} >share button</button>
    </div>
  </div>)
}