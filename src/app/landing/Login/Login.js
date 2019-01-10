import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';

export function LoginPage(props) {
  return (
    <main>
      <h2 className="landing-form-title">Login to Womby</h2>
      <LoginForm />
      <p className="landing-form-redirect">
        Don't have an account?
        <Link className="landing-form-redirect-link" to="/register">
          Register here.
        </Link>
      </p>
    </main>
  );
}
export default LoginPage;
