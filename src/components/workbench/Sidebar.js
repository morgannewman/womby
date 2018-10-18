import React from 'react';
import { connect } from 'react-redux';

export class Sidebar extends React.Component {
  render() {
    return (
      <h3>Sidebar</h3>
    );
  }
}

export default connect()(Sidebar);