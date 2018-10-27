import React from 'react'

export default class AddNotesForm extends React.Component {
  onSubmit = e => {
    e.preventDefault()
    this.props.handleSubmit(this.input.value)
    this.input.value = ''
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <label>
          Title
          <input ref={i => (this.input = i)} placeholder="Dogs are the best" />
        </label>
        <button type="submit">Submit</button>
      </form>
    )
  }
}
