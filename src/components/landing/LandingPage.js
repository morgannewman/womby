import './LandingPage.scss'
import React from 'react'
import { Link } from 'react-router-dom'
import Media from 'react-media'

export default class LandingPage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="landing">
          <main className="landing-container">
            <div className="landing-text-container">
              <h2 className="landing-text">
                A delightfully simple notetaking app that saves as you type.
              </h2>
              <Link className="landing-text-link" to="/register">
                Get Started
              </Link>
            </div>
            <div className="landing-image-container">
              <Media query={{ maxWidth: 800 }}>
                {isSmall =>
                  isSmall ? (
                    <img
                      className="landing-image landing-image__small"
                      src={require('../../resources/large-screenshot.png')}
                      alt="A screenshot of Womby"
                    />
                  ) : (
                    <img
                      className="landing-image landing-image__large"
                      src={require('../../resources/large-screenshot.png')}
                      alt="A screenshot of Womby"
                    />
                  )
                }
              </Media>
            </div>
          </main>
        </div>
      </React.Fragment>
    )
  }
}
