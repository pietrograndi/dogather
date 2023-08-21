import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './pages/layout';
import { CollaborationContextProvider } from './context/collab';
import { QueryParamProvider } from 'use-query-params'
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6'

function App() {
  return (
    <BrowserRouter>
      <QueryParamProvider adapter={ReactRouter6Adapter}>
        <CollaborationContextProvider>
          <Routes>
            <Route path="/:room" Component={Layout} />
            <Route path="/" Component={Layout} />
          </Routes>
        </CollaborationContextProvider>
      </QueryParamProvider>
    </BrowserRouter>
  )
}



export default App
