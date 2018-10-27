import './Footer.scss'
import React from 'react'
import { FaGithub as GithubIcon } from 'react-icons/fa'

export default function Footer(props) {
  return (
    <footer className="landing-footer">
      <a
        className="landing-footer-link"
        href="https://github.com/morgannewman/womby"
        target="_blank"
        rel="noopener noreferrer"
      >
        <h2 className="screen-reader-only">View on Github</h2>
        <GithubIcon className="landing-footer-icon" />
      </a>
    </footer>
  )
}
