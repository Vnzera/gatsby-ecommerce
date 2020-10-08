/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it

import "./src/styles/tailwind.css"

import CartContextProvider from './src/context/CartContext';

export const wrapRootElement = CartContextProvider;