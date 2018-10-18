import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from '../common/RequiresLogin';
import Layout from './Layout';
import Sidebar from './Sidebar';
import Editor from './Editor';
import Toolbar from './Toolbar';
import Nav from './Nav';

export class Workbench extends React.Component {
  componentDidMount() {
    // Fetch some data, maybe?
  }

  render() {
    return (
        <Layout 
          left={ <Sidebar /> }
          right={ <Editor /> }
          rightTop={ <Toolbar /> }
          top={ <Nav /> }
        />
    );
  }
}

const mapStateToProps = state => { };

export default requiresLogin()(connect(mapStateToProps)(Workbench));

