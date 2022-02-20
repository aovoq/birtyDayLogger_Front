import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
import styled from 'styled-components'
import Calendar from '../components/Calendar'
import Addform from '../components/Addform'
import axios from 'axios'

const Logo = styled.h1`
   font-family: 'Kanit', sans-serif;
  font-weight: 900;
`

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
  flex-direction: column;
  overflow: hidden;
`

const Wrapper = styled.div`
  border: 3px solid #212121;
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

const LogoutButton = styled.button`
  position: absolute;
  bottom: 1rem;
  width: 90%;
  border: 3px solid #212121;
  font-family: 'Kanit', sans-serif;
  font-weight: 900;
  line-height: 1;
  padding: 0.2rem 2rem 0.3rem;
`

const Table = styled.table`
  font-size: 2rem;
  width: 100%;
  //border: 3px solid #212121;
  border-collapse: collapse;
  background: #e5e4e4;

  td {
    border-bottom: 2px solid #212121;
  }
  td:nth-child(3) {
    text-align: right;
  }
  td:nth-child(4) {
    text-align: right;
  }
  tr:first-child {
    td {
      border-top: 2px solid #212121;
    }
  }
  tr:last-child {
    td {
      border: none;
    }
  }
`

const Home = () => {
   const { user, logout } = useContext(UserContext)
   // console.log(user)
   const [data, setData] = useState([])

   const getData = async () => {
      const loginToken = localStorage.getItem('loginToken')
      const Axios = axios.create({ baseURL: 'http://localhost:3000/api/' })
      Axios.defaults.headers.common['Authorization'] = `Bearer ${loginToken}`
      try {
         const { data: res } = await Axios.get('birthday/read.php')
         setData(res.birthdays)
      } catch (error) {
         console.error('error addData', error)
      }
   }

   useEffect(() => {
      getData()
   }, [])

   return (
      <Container>
         <Logo>BirtyDayLogger</Logo>
         <Wrapper>
            <Addform getData={getData}/>
            <Table>
               <tbody>
               {data.map((data) => {
                  return (
                     <tr key={data.id}>
                        <td>{data.name}</td>
                        <td>:</td>
                        <td>{data.date.split('-')[0]}月</td>
                        <td>{data.date.split('-')[1]}日</td>
                     </tr>
                  )
               })}
               </tbody>
            </Table>
         </Wrapper>
         {/*<h2>id =&gt; {user.id}</h2>*/}
         <LogoutButton onClick={logout}>logout</LogoutButton>
         {/*<Calendar/>*/}
      </Container>
   )
}

export default Home
