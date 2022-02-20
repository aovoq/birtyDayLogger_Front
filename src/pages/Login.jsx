import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import styled from 'styled-components'
import Copyright from '../components/Copyright'

const Container = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Kanit:wght@400;500;600;700;800;900&display=swap');

  background-image: linear-gradient(0deg, transparent 49%, #898989 50%, transparent 51%),
  linear-gradient(90deg, transparent 49%, #898989 50%, transparent 51%);
  height: 100%;
  background-size: 125px 125px;
  background-position: center;
  background-repeat: repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`

const LoginBox = styled.div`
  border: 3px solid #212121;
  min-width: 300px;
  max-width: 400px;
  width: 90%;
  background: #e5e4e4;

  .title {
    text-transform: uppercase;
    font-family: 'Kanit', sans-serif;
    font-size: 72px;
    line-height: 1;
    font-weight: 900;
    text-align: center;
  }
`

const EmailBox = styled.div`
  border-top: 2px solid #212121;
  position: relative;
  height: 50px;

  label {
    position: absolute;
    top: 0;
    left: 3px;
    font-family: 'Kanit', sans-serif;
    font-weight: 900;
    font-size: 12px;
    line-height: 1;
    text-transform: uppercase;
  }

  input {
    width: 100%;
    height: 100%;
    padding-left: 10px;
    outline: none;
    border: none;
    display: block;
    font-size: 1.2rem;
    font-family: 'Kanit', sans-serif;
    font-weight: 600;
    letter-spacing: 0.5px;
    background: transparent;
    caret-shape: block;
  }
`

const PasswordBox = styled.div`
  border-top: 2px solid #212121;
  position: relative;
  height: 50px;
  display: flex;

  label {
    position: absolute;
    top: 0;
    left: 3px;
    font-family: 'Kanit', sans-serif;
    font-weight: 900;
    font-size: 12px;
    line-height: 1;
    text-transform: uppercase;
  }

  input {
    height: 100%;
    outline: none;
    border: none;
    padding-left: 10px;
    display: block;
    font-size: 2rem;
    letter-spacing: -2px;
    background: transparent;
    width: 50%;
    flex: 1;
    caret-shape: block;
  }

  button {
    cursor: pointer;
    width: 100px;
    outline: none;
    border: none;
    border-left: 2px solid #212121;
    background: #f7ca4d;
    font-family: 'Kanit', sans-serif;
    font-weight: 900;
    font-size: 32px;

    &:hover {
      background: #ffe59e;
      color: #616161;
    }
  }
`

const LinkBox = styled.div`
  border-top: 2px solid #212121;

  a {
    font-family: 'Kanit', sans-serif;
    font-weight: 900;
    font-size: 10px;
    text-decoration: none;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 9px 0;
  }

  .text {
    width: 95%;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 2px;
    display: inline-block;
    background: #212121;
    color: #e5e4e4;
    white-space: nowrap;
  }

  .accent {
    color: #f7ca4d;
  }
`

const Login = () => {
   const { loginUser, wait, loggedInCheck } = useContext(UserContext)
   const [redirect, setRedirect] = useState(false)
   const [errorMsg, setErrorMsg] = useState(false)
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

      const data = await loginUser(formData)
      console.log(data)
      if (data.success) {
         e.target.reset()
         setRedirect('Redirecting...')
         await loggedInCheck()
         return
      }
      setErrorMsg(data.message)
   }

   return (
      <Container>
         <LoginBox>
            <h2 className='title'>Log In</h2>
            <form onSubmit={submitForm}>
               <EmailBox>
                  <label htmlFor='email'>Email :</label>
                  <input
                     type='email'
                     name='email'
                     onChange={onChangeInput}
                     id='email'
                     value={formData.email}
                     required
                     autoComplete='off'
                  />
               </EmailBox>
               <PasswordBox>
                  <label htmlFor='password'>Password :</label>
                  <input
                     type='password'
                     name='password'
                     onChange={onChangeInput}
                     id='password'
                     value={formData.password}
                     required
                  />
                  <button type='submit'>OK?</button>
               </PasswordBox>
               <LinkBox>
                  <Link to='/signup'>
                     <p className='text'>
                        Is this the First Time? <span className='accent'>create an Account</span>
                     </p>
                  </Link>
               </LinkBox>
               {errorMsg && <div className='errorMsg'>{errorMsg}</div>}
               {/* {redirect ? (
                  redirect
               ) : (
                  // <button type='submit' disabled={wait}>
                  //    OK?
                  // </button>
                  <div>hoge</div>
               )} */}
            </form>
         </LoginBox>
         <Copyright/>
      </Container>
   )
}

export default Login
