import { useContext } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { UserContext } from './context/UserContext'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import './App.css'

function App() {
   const { user } = useContext(UserContext)
   return (
      <>
         <BrowserRouter>
            <Routes>
               {user && <Route path='/' element={<Home />} />}
               {!user && (
                  <>
                     <Route path='/login' element={<Login />} />
                     <Route path='/signup' element={<Register />} />
                  </>
               )}
               <Route path='*' element={<Navigate to={user ? '/' : '/login'} />} />
            </Routes>
         </BrowserRouter>
      </>
   )
}

// function App() {
//    const [year, setYear] = useState(new Date().getFullYear())
//    const [month, setMonth] = useState(new Date().getMonth() + 1)
//    const calendar = createCalendar(year, month)

//    const onClick = (num) => {
//       const nextMonth = month + num
//       if (12 < nextMonth) {
//          setMonth(1)
//          setYear(year + 1)
//       } else if (nextMonth < 1) {
//          setMonth(12)
//          setYear(year - 1)
//       } else {
//          setMonth(nextMonth)
//       }
//    }

//    console.log(calendar)

//    return (
//       <>
//          <h1>{`${month}月 ${year}年`}</h1>
//          <div>
//             <button
//                onClick={() => {
//                   onClick(-1)
//                }}>
//                {'prev'}
//             </button>
//             <button
//                onClick={() => {
//                   onClick(1)
//                }}>
//                {'next'}
//             </button>
//          </div>
//          <table>
//             <tbody>
//                {calendar.map((week, i) => (
//                   <tr key={week.join('')}>
//                      {week.map((day, j) => (
//                         <th key={`${i}${j}`}>{day}</th>
//                      ))}
//                   </tr>
//                ))}
//             </tbody>
//          </table>
//       </>
//    )
// }

// const createCalendar = (year, month) => {
//    const first = new Date(year, month - 1, 1).getDay()
//    const last = new Date(year, month, 0).getDate()
//    return [0, 1, 2, 3, 4, 5].map((weekIndex) => {
//       return [0, 1, 2, 3, 4, 5, 6].map((dayIndex) => {
//          const day = dayIndex + 1 + weekIndex * 7
//          return day - 1 < first || last < day - first ? null : day - first
//       })
//    })
// }

export default App
