import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import UserContextProvider from './context/UserContext'
import { GlobalStyles } from './globalStyle'

ReactDOM.render(
   <React.StrictMode>
      <UserContextProvider>
         <GlobalStyles />
         <App />
      </UserContextProvider>
   </React.StrictMode>,
   document.getElementById('root'),
)
