import React from 'react'
import { connect } from 'react-redux'

export class Toolbar extends React.Component {
  render() {
    return (
      <div className="toolbar">
        <h3>Toolbar</h3>
      </div>
    )
  }
}

export default connect()(Toolbar)
