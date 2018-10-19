import React from 'react'
import LoginForm from '../LoginForm'
import { shallow } from 'enzyme'

describe('LoginForm', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<LoginForm />)
  })
  it('Should render without crashing', () => {})
})
