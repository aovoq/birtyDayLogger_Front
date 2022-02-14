import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`

   *,
   *::after,
   *::before {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
   }

   body {
      background-color: #E5E4E4;
      color: #212121;
      height: 100vh;
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      overflow: hidden;
   }

   #root {
      height: 100%;
   }
`
