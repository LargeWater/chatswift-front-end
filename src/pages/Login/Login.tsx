import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Main, Input, Message, Form, Label, Button } from '../../components/Common/Index'

import * as authService from '../../services/authService'

const LoginPage = ({ handleAuthEvt }) => {
  const navigate = useNavigate()

  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (evt: { target: { name: any; value: any } }) => {
    setMessage('')
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = async (evt: { preventDefault: () => void }) => {
    evt.preventDefault()
    try {
      if (!import.meta.env.VITE_BACK_END_SERVER_URL) {
        throw new Error('No VITE_BACK_END_SERVER_URL in front-end .env')
      }
      await authService.login(formData)
      handleAuthEvt()
      navigate('/')
    } catch (err) {
      console.log(err)
      setMessage(err.message)
    }
  }

  const { email, password } = formData

  const isFormInvalid = () => {
    return !(email && password)
  }

  return (
    <Main >
      <h1>Log In</h1>
      <Message>{message}</Message>
      <Form autoComplete="off" onSubmit={handleSubmit}>
        <Label>
          Email
          <Input
            type="text"
            value={email}
            name="email"
            onChange={handleChange}
          />
        </Label>
        <Label>
          Password
          <Input
            type="password"
            value={password}
            name="password"
            onChange={handleChange}
          />
        </Label>
        <div>
          <Link to="/">Cancel</Link>
          <Button disabled={isFormInvalid()}>
            Log In
          </Button>
        </div>
      </Form>
    </Main>
  )
}

export default LoginPage
