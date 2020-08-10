import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useState } from "react"

// Todo: you can add two different paths for the svg. Show an X instead of the hamburger menu when the nav isOpen

const Header = ({ siteTitle }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navToggle = () => {
    setIsOpen(!isOpen);
  }

  return (
    <header className="bg-teal-600 sm:flex sm:justify-between sm:px-4 sm:py-3">
      <div className="flex items-center justify-between px-4 py-3 sm:p-0">
        <div>
          <h2 className="m-0 p-1 rounded hover:bg-teal-700">
            <Link
              to="/"
              className="no-underline text-white"
            >
              {siteTitle}
            </Link>
          </h2>
        </div>
        <div className="sm:hidden">
          <button onClick={navToggle} type="button" className="sm:hidden text-white hover:text-gray-800 focus:text-white focus:outline-none">
            <svg className="h-6 w-6 fill-current" viewBox="0 0 26 26">
              <path d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z" />
            </svg>
          </button>
        </div>
      </div>
      <div className={`pt-2 pb-4 sm:pb-0 sm:flex ${isOpen ? 'block' : 'hidden'}`}>
        <Link className="block sm:mt-0 sm:w-auto w-40 px-2 py-1 text-white font-semibold rounded hover:bg-teal-700" to="/about">About</Link>
        <Link className="block sm:mt-0 sm:w-auto w-40 px-2 py-1 text-white font-semibold rounded hover:bg-teal-700" to="/contact">Contact</Link>
        <Link className="block sm:mt-0 sm:w-auto w-40 px-2 py-1 text-white font-semibold rounded hover:bg-teal-700" to="/cart">Cart</Link>
      </div>
    </header >
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: `Eternity`,
}

export default Header
