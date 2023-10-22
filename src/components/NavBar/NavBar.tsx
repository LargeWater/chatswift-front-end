import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from '@emotion/styled'

const Theme = {
  colors: {
    bg: `#fff`,
    dark: `#24292e`,
    light: `#EEEEEE`,
  },
  fonts: {
    heading: `Inter, sans-serif`,
  }
}

const Nav = styled.nav`
  background: ${Theme.colors.dark};
  font-family: ${Theme.fonts.heading};
  color: ${Theme.colors.light};
  display: flex;
  align-items: center;
  justify-content: space-between;
  a { color: white; text-decoration: none; }`;

  const Ul = styled.ul({
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
  })

const Li = styled.li`
  flex: 0 0 auto;
  -webkit-box-align: center;
  -webkit-box-pack: center;
  -webkit-tap-highlight-color: transparent;
  align-items: center;
  color: #999;
  height: 100%;
  justify-content: center;
  text-decoration: none;
  -webkit-box-align: center;
  -webkit-box-pack: center;
  -webkit-tap-highlight-color: transparent;
  align-items: center;
  color: #999;
  display: flex;
  font-size: 14px;
  height: 50px;
  justify-content: center;
  line-height: 16px;
  margin: 0 10px ;
  text-decoration: none`;


const NavBar = ({ user, handleLogout }) => {
  return (
    <Nav>
      {user ?
        <Ul>
          <Li>Welcome, {user.name}</Li>
          <Li><NavLink to="" onClick={handleLogout}>LOG OUT</NavLink></Li>
          <Li><NavLink to="/auth/change-password">Change Password</NavLink></Li>
          <Li><NavLink to="/chats">Chats</NavLink></Li>
        </Ul>
      :
        <Ul>
          <Li><NavLink to="/auth/login">Log In</NavLink></Li>
          <Li><NavLink to="/auth/signup">Sign Up</NavLink></Li>
        </Ul>
      }
    </Nav>
  )
}

export default NavBar
