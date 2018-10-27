# Womby [![Build Status](https://travis-ci.org/morgannewman/womby.svg?branch=master)](https://travis-ci.org/morgannewman/womby)

Womby is a delightfully simple web-based notetaking app that autosaves your notes as you type. It works on all devices with modern internet browsers.

> See it live: <a href="https://womby-staging.firebaseapp.com/" target="_blank">https://womby-staging.firebaseapp.com/</a>

<img src="https://image.ibb.co/b3zYoA/large-screenshot.png" alt="A screenshot of Womby's desktop layout" width="700">

Data persistence is achieved using a RESTful API built with NodeJS and Express. [The backend repo can be found here](https://github.com/morgannewman/womby-backend).

## Engineering Highlights

- Designed for both mobile and desktop devices
- Thoughtful autosaving to reduce load on backend while never losing user data
- Persistent login / authentication using JWTs
- Data persistence using a RESTful backend (check it out [here](https://github.com/morgannewman/womby-backend)).

## Tech Stack

### Front End

> <img src="src/resources/readme/js.svg" width="40px"> <img src="src/resources/readme/react.svg" width="40px"> <img src="src/resources/readme/sass.svg" width="40px"> <img src="src/resources/readme/firebase.svg" width="32px"> <img src="src/resources/readme/jest.svg" width="38px"> <img src="src/resources/readme/git.svg" width="40px"> <img src="src/resources/readme/travis-ci.svg" width="40px">

- **JS** / **React** / **Sass**
- Hosting with **Google Firebase**
- Testing with **Jest** / **Enzyme**
- **Git** / **GitHub** for version control
- **Travis** for Continuous Integration

### Back End

> <img src="src/resources/readme/node.svg" width="40px"> <img src="src/resources/readme/express.svg" width="40px"> <img src="src/resources/readme/passport.svg" width="32px"> <img src="src/resources/readme/mocha.svg" width="40px"> <img src="src/resources/readme/heroku.svg" width="40px"> <img src="src/resources/readme/git.svg" width="40px"> <img src="src/resources/readme/travis-ci.svg" width="40px">

- **NodeJS** for runtime environment
- **Express** for the HTTP server layer
- **PassportJS** framework for authentication strats
- **Mocha** / **Chai** for testing
- **Heroku** for backend deployment
- **Git** / **GitHub** for version control
- **Travis** for Continuous Integration

## Architecture

The entire application lives in the `src/` folder:

```text
.
├── components
│   ├── common     <-- Holds a few general helper functions
│   ├── landing    <-- Houses the unauthenticated user flow
│   └── workbench  <-- Contains the meat of the application
│       ├── Workbench.js  <-- The container component for the editor app
│       ├── addNote       <-- The add note (+) button
│       ├── editor        <-- The Editor component (the heart of the application)
│       │   ├── Autosaver.js  <-- A clever little way to debounce autosaving
│       │   └── Editor.js     <-- See inline documentation!
│       └── menus         <-- Contains the menu components for both layouts
│           ├── MobileMenu.js  <-- The hamburger and slide-out menu for mobile
│           ├── Toolbar.js     <-- The desktop toolbar on the left side
│           └── sidebar        <-- The file explorer used in both menus
├── controller  <-- Holds the Redux layer of the application
└── db          <-- An interface to access the backend of the application
```
