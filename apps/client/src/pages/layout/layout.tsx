import { Provider } from "jotai"
import { Navbar } from "../../components/navbar"
import { Playground } from "../../components/playground"

export const Layout = () => {
  return (
    <Provider>
      <Navbar />
      <Playground />
    </Provider>
  )
}