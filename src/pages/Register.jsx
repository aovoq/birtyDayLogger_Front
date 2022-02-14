import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

const Register = () => {
   const { registerUser, wait } = useContext(UserContext)
   const [errorMsg, setErrorMsg] = useState(false)
   const [successMsg, setSuccessMsg] = useState(false)
   const [formData, setFormData] = useState({
      email: '',
      password: '',
   })

   const onChangeInput = (e) => {
      setFormData({
         ...formData,
         [e.target.name]: e.target.value,
      })
   }

   const submitForm = async (e) => {
      e.preventDefault()

      if (!Object.values(formData).every((val) => val.trim() !== '')) {
         setErrorMsg('Please Fill in all Required Fields!')
         return
      }

      const data = await registerUser(formData)
      if (data.success) {
         e.target.reset()
         setSuccessMsg('You have successfully registered.')
         setErrorMsg(false)
      } else if (!data.success && data.message) {
         setSuccessMsg(false)
         setErrorMsg(data.message)
      }
   }

   return (
      <div className='myform'>
         <h2>signup</h2>
         <form onSubmit={submitForm}>
            <label htmlFor='email'>Email:</label>
            <input
               type='email'
               name='email'
               onChange={onChangeInput}
               id='email'
               value={formData.email}
               required
            />
            <label htmlFor='password'>Password:</label>
            <input
               type='password'
               name='password'
               onChange={onChangeInput}
               id='password'
               value={formData.password}
               required
            />
            {successMsg && <div>{successMsg}</div>}
            {errorMsg && <div className='errorMsg'>{errorMsg}</div>}
            <button type='submit' disabled={wait}>
               Signup
            </button>
            <div>
               <Link to='/login'>Login</Link>
            </div>
         </form>
      </div>
   )
}

export default Register
