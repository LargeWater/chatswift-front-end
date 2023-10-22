import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Main, Input, Message, Form, Label, Button } from '../../components/Common/Index'

import * as authService from '../../services/authService'
import React from 'react'

const ChangePassword = ({ handleAuthEvt }) => {
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState({
    password: '',
    newPassword: '',
    newPasswordConf: '',
  })

  const handleChange = (evt: { target: { name: any; value: any } }) => {
    setMessage('')
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = async (evt: { preventDefault: () => void }) => {
    evt.preventDefault()
    try {
      await authService.changePassword(formData)
      handleAuthEvt()
      navigate('/')
    } catch (err) {
      setMessage(err.message)
    }
  }

  const { password, newPassword, newPasswordConf } = formData

  const isFormInvalid = () => {
    return !(password && newPassword && newPassword === newPasswordConf)
  }

  return (
    <Main>
      <h1>Change Password</h1>
      <Message>{message}</Message>
      <Form autoComplete="off" onSubmit={handleSubmit}>
        <Label>
          Current Password
          <input
            type="password"
            value={password}
            name="password"
            onChange={handleChange}
          />
        </Label>
        <Label>
          New Password
          <Input
            type="password"
            value={newPassword}
            name="newPassword"
            onChange={handleChange}
          />
        </Label>
        <Label>
          Confirm New Password
          <Input
            type="password"
            value={newPasswordConf}
            name="newPasswordConf"
            onChange={handleChange}
          />
        </Label>
        <div>
          <Link to="/">Cancel</Link>
          <Button disabled={isFormInvalid()}>
            Change Password
          </Button>
        </div>
      </Form>
    </Main>
  )
}

export default ChangePassword
