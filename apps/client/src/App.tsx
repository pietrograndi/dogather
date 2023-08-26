import './App.css'
import { Provider } from 'jotai'
import { Playground } from './components/playground';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CollabContextComponent } from './collab/collabContext';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import { Collabo } from './components/collabo';

const MainPage = () => {
  return (
    <Provider>
      <CollabContextComponent>
        <Playground />
        <Collabo />
      </CollabContextComponent>
    </Provider>
  )
}

function App() {
  return (
    <BrowserRouter>
      <QueryParamProvider adapter={ReactRouter6Adapter}>
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </QueryParamProvider>
    </BrowserRouter>
    )
}

export default App
