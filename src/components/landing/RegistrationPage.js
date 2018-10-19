import React from 'react'
import { Link } from 'react-router-dom'
import RegistrationForm from './RegistrationForm'

export function RegistrationPage(props) {
  return (
    <div className="home">
      <h2>Register for Womby</h2>
      <RegistrationForm />
      <Link to="/">Login</Link>
    </div>
  )
}

export default RegistrationPage
