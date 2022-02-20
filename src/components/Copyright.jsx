import React from 'react'
import styled from 'styled-components'

const Container = styled.p`
  @import url('https://fonts.googleapis.com/css2?family=Holtwood+One+SC&family=Kanit:wght@400;500;600;700;800;900&display=swap');

  position: absolute;
  bottom: 0;
  font-family: 'Kanit', sans-serif;
  font-weight: 900;
  color: rgba(0, 0, 0, 0.6);

  small {
    font-size: 0.8rem;
  }
`

const Copyright = () => {
   return (
      <Container>
         <small>
            (C) 2022 BIRTH DAY LOGGER
         </small>
      </Container>
   )
}

export default Copyright
