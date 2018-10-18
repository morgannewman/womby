import React from 'react'
import RegistrationForm from '../RegistrationForm'
import { shallow } from 'enzyme'

describe('RegistrationForm', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<RegistrationForm />)
  })
  it('Should render without crashing', () => {
    wrapper
  })
})
