import React from 'react';
import { connect } from 'react-redux';

export class Toolbar extends React.Component {
  render() {
    return (
      <h3>Toolbar</h3>
    );
  }
}

export default connect()(Toolbar);