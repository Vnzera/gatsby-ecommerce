import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const CanceledPage = () => (
    <Layout>
        <SEO title="Canceled Page" />
        <h1>Oh no!</h1>
        <p>There was an issue processing your payment.</p>
        <Link to="/">Go back to the homepage</Link>
    </Layout>
)

export default CanceledPage