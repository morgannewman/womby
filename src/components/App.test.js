import React from 'react'
import App from '../components/App'
import { shallow } from 'enzyme'

it('renders without crashing', () => {
  shallow(<App />)
})
