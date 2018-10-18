import React from 'react'
import { Field, reduxForm, focus } from 'redux-form'
import { registerUser } from '../../controller/actions/users'
import { login } from '../../controller/actions/auth'
import Input from '../common/Input'
import {
  required,
  nonEmpty,
  matches,
  length,
  isTrimmed
} from '../common/validateHelpers'
const passwordLength = length({ min: 8, max: 72 })
const matchesPassword = matches('password')

export class RegistrationForm extends React.Component {
  onSubmit = values => {
    const { email, password, firstName, lastName } = values
    const user = { email, password, firstName, lastName }
    return this.props
      .dispatch(registerUser(user))
      .then(() => this.props.dispatch(login(email, password)))
  }

  render() {
    return (
      <form
        className="login-form"
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        <label htmlFor="firstName">First Name</label>
        <Field component={Input} type="text" name="firstName" />
        <label htmlFor="lastName">Last Name</label>
        <Field component={Input} type="text" name="lastName" />
        <label htmlFor="email">Email</label>
        <Field
          component={Input}
          type="email"
          name="email"
          validate={[required, nonEmpty, isTrimmed]}
        />
        <label htmlFor="password">Password</label>
        <Field
          component={Input}
          type="password"
          name="password"
          validate={[required, passwordLength, isTrimmed]}
        />
        <label htmlFor="passwordConfirm">Confirm password</label>
        <Field
          component={Input}
          type="password"
          name="passwordConfirm"
          validate={[required, nonEmpty, matchesPassword]}
        />
        <button
          type="submit"
          disabled={this.props.pristine || this.props.submitting}
        >
          Register
        </button>
      </form>
    )
  }
}

export default reduxForm({
  form: 'registration',
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus('registration', Object.keys(errors)[0]))
})(RegistrationForm)
