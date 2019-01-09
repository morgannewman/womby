import React from 'react';
import { Link } from 'react-router-dom';
import RegistrationForm from './RegistrationForm';

export function Registration(props) {
  return (
    <main>
      <h2 className="landing-form-title">Register Now</h2>
      <RegistrationForm />
      <p className="landing-form-redirect">
        Already have an account?
        <Link className="landing-form-redirect-link" to="/login">
          Login here.
        </Link>
      </p>
    </main>
  );
}

export default Registration;
