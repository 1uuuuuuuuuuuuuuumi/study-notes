import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Equipments from './pages/Equipments'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/equipments" element={<Equipments />} />
      </Routes>
    </>
  )
}

export default App
