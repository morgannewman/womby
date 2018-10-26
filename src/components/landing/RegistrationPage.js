import React from 'react'
import { Link } from 'react-router-dom'
import RegistrationForm from './RegistrationForm'

export function RegistrationPage(props) {
  return (
    <div className="home">
      <h2 className="landing-form-title">Register Now to Get Started</h2>
      <RegistrationForm />
      <p className="landing-form-redirect">
        Already have an account?
        <Link className="landing-form-redirect-link" to="/login">
          Login here.
        </Link>
      </p>
    </div>
  )
}

export default RegistrationPage
