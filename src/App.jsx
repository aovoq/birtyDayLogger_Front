import { useContext } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { UserContext } from './context/UserContext'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import './App.css'
import Firstview from './pages/Firstview'

function App() {
   const { user } = useContext(UserContext)
   return (
      <>
         <BrowserRouter>
            <Routes>
               {user && <Route path='/' element={<Home />} />}
               {!user && (
                  <>
                     <Route path='/hello' element={<Firstview />} />
                     <Route path='/login' element={<Login />} />
                     <Route path='/signup' element={<Register />} />
                  </>
               )}
               <Route path='*' element={<Navigate to={user ? '/' : '/hello'} />} />
            </Routes>
         </BrowserRouter>
      </>
   )
}

export default App
