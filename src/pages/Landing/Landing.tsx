import React from 'react'
import { Main } from '../../components/Common/Index'

const Landing = ({ user }) => {
  return (
    <Main>
      <h1>hello, {user ? user.name : 'friend'}</h1>
    </Main>
  )
}

export default Landing
