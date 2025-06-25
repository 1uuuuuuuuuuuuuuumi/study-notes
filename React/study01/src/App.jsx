import { Route, Routes } from 'react-router-dom'
import './App.css'
import Study from './components/Study'
import Home from './pages/Home'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/study' element={<Study />}/>
      </Routes>
    </>
  )
}

export default App
