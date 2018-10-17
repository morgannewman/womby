import React from 'react';
import { Link } from 'react-router-dom';

export default class LandingPage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Link to="/login"><button>Login</button></Link>
        <Link to="/register"><button>Register</button></Link>
      </React.Fragment>
    );
  }
}


