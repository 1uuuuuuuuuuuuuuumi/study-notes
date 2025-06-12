import { Route, Routes } from 'react-router-dom'
import './App.css'
import Study from './components/Study'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Study />}/>
      </Routes>
    </>
  )
}

export default App
