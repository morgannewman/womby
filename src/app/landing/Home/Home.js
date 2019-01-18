import React from 'react';

export default class Home extends React.Component {
  render() {
    return (
      <main className="home">
        <div className="home-cta-container">
          <h2 className="home-cta">
            A delightfully simple notetaking app that saves as you type.
          </h2>
          {/* <Link className="home-cta-button landing-button__cta" to="/register">
            Get Started
          </Link> */}
        </div>
        <div className="home-image-container">
          <img
            className="home-image"
            src={require('../../../assets/womby.png')}
            alt="A screenshot of Womby"
          />
        </div>
      </main>
    );
  }
}
