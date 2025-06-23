import { Route, Routes } from 'react-router-dom'
import './App.css'
import Study from './components/Study'
import Home from './pages/Home'
import Study02 from './components/Study02'

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
