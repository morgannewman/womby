import React from 'react'
import Media from 'react-media'

export const Desktop = props => <Media {...props} query={{ minWidth: 992 }} />
export const Tablet = props => (
  <Media {...props} query={{ minWidth: 768, maxWidth: 991 }} />
)
export const Mobile = props => <Media {...props} query={{ maxWidth: 767 }} />
export const Default = props => <Media {...props} query={{ minWidth: 768 }} />
