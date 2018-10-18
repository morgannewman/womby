import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from '../common/RequiresLogin';

export class Workbench extends React.Component {
  componentDidMount() {
    // Fetch some data, maybe?
  }

  render() {
    return (
      <div className="dashboard">
        <h3>You logged in!</h3>
      </div>
    );
  }
}

const mapStateToProps = state => {};

export default requiresLogin()(connect(mapStateToProps)(Workbench));

