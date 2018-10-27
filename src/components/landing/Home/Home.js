import './Home.scss'
import React from 'react'
import { Link } from 'react-router-dom'
import Media from 'react-media'

export default class Home extends React.Component {
  render() {
    return (
      <main className="home">
        <div className="home-cta-container">
          <h2 className="home-cta">
            A delightfully simple notetaking app that saves as you type.
          </h2>
          <Link className="home-cta-button landing-button__cta" to="/register">
            Get Started
          </Link>
        </div>
        <div className="home-image-container">
          <Media query={{ maxWidth: 800 }}>
            {isSmall =>
              isSmall ? (
                <img
                  className="home-image home-image__small"
                  src={require('../../../resources/small-screenshot.png')}
                  alt="A screenshot of Womby"
                />
              ) : (
                <img
                  className="home-image home-image__large"
                  src={require('../../../resources/large-screenshot.png')}
                  alt="A screenshot of Womby"
                />
              )
            }
          </Media>
        </div>
      </main>
    )
  }
}
