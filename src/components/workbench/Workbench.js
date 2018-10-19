// modules
import React from 'react'
import { connect } from 'react-redux'
// redux
import { populateNotes } from '../../controller/actions/notes'
// common
import requiresLogin from '../common/RequiresLogin'
import Layout from './Layout'
// workbench
import Sidebar from './sidebar/Sidebar'
import Editor from './Editor'
import Toolbar from './Toolbar'
import Nav from './Nav'

export class Workbench extends React.Component {
  componentDidMount() {
    this.props.dispatch(populateNotes())
  }

  render() {
    return (
      <Layout
        left={<Sidebar />}
        right={<Editor />}
        rightTop={<Toolbar />}
        top={<Nav />}
      />
    )
  }
}

const mapStateToProps = state => {}

export default requiresLogin()(connect(mapStateToProps)(Workbench))
