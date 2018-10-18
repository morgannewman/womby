import React from 'react'
import { connect } from 'react-redux'

export class Editor extends React.Component {
  render() {
    return <h3>Editor</h3>
  }
}

export default connect()(Editor)
