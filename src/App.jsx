import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from "./components/Layout";
import Home from './pages/Home'
import Galpoes from './pages/Galpoes'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="galpoes" element={<Galpoes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App