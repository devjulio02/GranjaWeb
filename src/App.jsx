import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Menu from './components/Menu'
import Home from './pages/Home'
import Galpoes from './pages/Galpoes'

function App() {
  return (
    <BrowserRouter>
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/galpoes" element={<Galpoes />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App