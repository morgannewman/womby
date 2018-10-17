import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';

export function LoginPage(props) {
  return (
    <div className="home">
      <LoginForm />
      <Link to="/register">Register</Link>
    </div>
  );
}
export default LoginPage;
