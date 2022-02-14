import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'

const Home = () => {
   const { user, logout } = useContext(UserContext)
   console.log(user)

   return (
      <div>
         <h1>Main </h1>
         <h2>id =&gt; {user.id}</h2>
         <button onClick={logout}>logout</button>
      </div>
   )
}

export default Home
