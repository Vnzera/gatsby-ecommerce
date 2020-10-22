import React, { useEffect, useContext } from "react"
import { Link } from "gatsby"
import { CartContext } from '../context/CartContext'

import Layout from "../components/layout"
import SEO from "../components/seo"

const SuccessPage = () => {
  const { cart, dispatch } = useContext(CartContext);

  // clear cart items if purchase is successful
  useEffect(() => {
    dispatch({
      type: 'SUCCESS',
      payload: cart
    })

  }, [])

  return (
    <Layout>
      <SEO title="Success Page" />
      <h1>Success!</h1>
      <p>Your payment was accepted.</p>
      <Link to="/">Go back to the homepage</Link>
    </Layout>
  )
}

export default SuccessPage
