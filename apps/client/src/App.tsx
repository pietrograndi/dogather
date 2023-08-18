import './App.css'
import { Provider } from 'jotai'
import { Playground } from './components/playground';

function App() {

  return (
    <Provider>
      <Playground />
    </Provider>
  )
}

export default App
