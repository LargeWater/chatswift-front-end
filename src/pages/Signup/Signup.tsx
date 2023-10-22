import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Main, Input, Message, Form, Label, Button } from '../../components/Common/Index'

import * as authService from '../../services/authService'

const Signup = ({ handleAuthEvt }) => {
  const navigate = useNavigate()

  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConf: '',
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

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
      setIsSubmitted(true)
      await authService.signup(formData)
      handleAuthEvt()
      navigate('/')
    } catch (err) {
      console.log(err)
      setMessage(err.message)
      setIsSubmitted(false)
    }
  }

  const { name, email, password, passwordConf } = formData

  const isFormInvalid = () => {
    return !(name && email && password && password === passwordConf)
  }

  return (
    <Main >
      <h1>Sign Up</h1>
      <Message>{message}</Message>
      <Form autoComplete="off" onSubmit={handleSubmit}>
        <Label>
          Name
          <Input type="text" value={name} name="name" onChange={handleChange} />
        </Label>
        <Label>
          Email
          <input
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
        <Label>
          Confirm Password
          <Input
            type="password"
            value={passwordConf}
            name="passwordConf"
            onChange={handleChange}
          />
        </Label>
        <div>
          <Link to="/">Cancel</Link>
          <Button
            disabled={ isFormInvalid() || isSubmitted }
          >
            {!isSubmitted ? 'Sign Up' : '🚀 Sending...'}
          </Button>
        </div>
      </Form>
    </Main>
  )
}

export default Signup
