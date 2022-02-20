import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import userContext, { UserContext } from '../context/UserContext'

const Form = styled.form`
  background: #e5e4e4;
`

const Upper = styled.div`
  width: 100%;
  display: flex;

  .input-box {
    width: 50%;
    position: relative;
    height: 2.5rem;
  }

  .input-box:first-child {
    border-right: 2px solid #212121;
  }

  label {
    position: absolute;
    top: 0;
    left: 3px;
    font-family: 'Kanit', sans-serif;
    font-weight: 900;
    font-size: 0.8rem;
    line-height: 1;
    text-transform: uppercase;
  }

  input {
    padding-left: 1rem;
    width: 100%;
    border: none;
    outline: none;
    background: transparent;
    height: 80%;
    position: absolute;
    bottom: 0;
  }
`
const Lower = styled.div`
  width: 100%;
  border-top: 2px solid #212121;

  .input-box {
    width: 100%;
    position: relative;
    height: 2.5rem;
  }

  label {
    position: absolute;
    top: 0;
    left: 3px;
    font-family: 'Kanit', sans-serif;
    font-weight: 900;
    font-size: 0.8rem;
    line-height: 1;
    text-transform: uppercase;
  }

  input {
    padding-left: 1rem;
    width: 100%;
    height: 80%;
    border: none;
    outline: none;
    background: transparent;
    position: absolute;
    bottom: 0;
  }
`

const Button = styled.button`
  cursor: pointer;
  width: 100%;
  outline: none;
  border: none;
  border-top: 2px solid #212121;
  border-bottom: 2px solid #212121;
  background: #f7ca4d;
  font-family: 'Kanit', sans-serif;
  font-weight: 900;
  font-size: 1.23rem;

  &:hover {
    background: #ffe59e;
    color: #616161;
  }
`

const Addform = (props) => {
   const { getData } = props
   const { user } = useContext(UserContext)
   const [wait, setWait] = useState(false)
   const [formData, setFormData] = useState({
      month: '',
      day: '',
      name: '',
   })


   const onChangeInput = (e) => {
      setFormData({
         ...formData,
         [e.target.name]: e.target.value
      })
   }

   const addData = async (e) => {
      e.preventDefault()
      console.log(formData)
      const loginToken = localStorage.getItem('loginToken')
      const Axios = axios.create({ baseURL: 'http://localhost:3000/api/' })
      Axios.defaults.headers.common['Authorization'] = `Bearer ${loginToken}`
      try {
         setWait(true)
         const { data } = await Axios.post('birthday/add.php', {
            name: formData.name,
            date: `${formData.month}-${formData.day}`,
            note: ''
         })
         console.log(data)
         setFormData({
            name: '',
            month: '',
            day: '',
         })
         getData()
      } catch (error) {
         setWait(false)
         console.error('error addData', error)
      }

   }

   return (
      <>
         <Form onSubmit={addData}>
            <Upper>
               <div className="input-box first">
                  <label htmlFor="month">MONTH: </label>
                  <input type="text" id="month"
                         onChange={onChangeInput}
                         value={formData.month}
                         name="month"
                         required
                  />
               </div>
               <div className="input-box">
                  <label htmlFor="day">DAY: </label>
                  <input type="text" id="day"
                         onChange={onChangeInput}
                         value={formData.day}
                         name="day"
                         required
                  />
               </div>

            </Upper>
            <Lower>
               <div className="input-box">
                  <label htmlFor="name">NAME: </label>
                  <input type="text" id="name"
                         onChange={onChangeInput}
                         value={formData.name}
                         name="name"
                         required
                  />
               </div>
            </Lower>
            <Button>ADD!</Button>
         </Form>
      </>
   )
}

export default Addform
