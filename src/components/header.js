import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useState } from "react"

const Header = ({ siteTitle }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navToggle = () => {
    setIsOpen(!isOpen);
  }

  return (
    <header className="bg-purple-800">
      <div className="flex items-center justify-between px-4 py-3">
        <div>
          <h2 className="m-0 p-1 rounded hover:bg-gray-800">
            <Link
              to="/"
              className="no-underline text-white"
            >
              {siteTitle}
            </Link>
          </h2>
        </div>
        <div>
          <button onClick={navToggle} type="button" className="text-white hover:text-gray-800 focus:text-white focus:outline-none">
            <svg className="h-6 w-6 fill-current" viewbox="0 0 24 24">
              <path d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z" />
            </svg>
          </button>
        </div>
      </div>
      <ul className={`pt-2 pb-4 ${isOpen ? 'block' : 'hidden'}`}>
        <a className="block px-2 py-1 text-white font-semibold rounded hover:bg-gray-800" href="http://localhost:8000/about">About</a>
        <a className="block px-2 py-1 text-white font-semibold rounded hover:bg-gray-800" href="http://localhost:8000/contact">Contact</a>
        <a className="block px-2 py-1 text-white font-semibold rounded hover:bg-gray-800" href="http://localhost:8000/cart">Cart</a>
      </ul>
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
