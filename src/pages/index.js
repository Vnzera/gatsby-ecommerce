import React from "react"
import Layout from "../components/layout"
import Product from "../components/gallery/product"
import SEO from "../components/seo"
import { StaticQuery, graphql } from 'gatsby';


// get product data from Stripe
const IndexPage = () => (
  <StaticQuery
    query={graphql`
      {
          allStripeSku {
              edges {
              node {
                  id
                  currency
                  price
                  image
                  attributes {
                  name
                  }
              }
              }
          }
}
`}
    // ({ node: sku }) changes the node alias to sku
    // otherwise, we could proceed with node.id, node.currency etc instead
    render={data => (
      <Layout>
        <SEO title="Home" />
        <div className="flex flex-row flex-wrap flex-auto justify-center mx-auto my-20">
          {data.allStripeSku.edges.map(({ node: sku }) =>
            <Product
              key={sku.id}
              id={sku.id}
              currency={sku.currency}
              price={sku.price}
              image={sku.image}
              name={sku.attributes.name}
              quantity={0}
            />
          )}
        </div>
      </Layout>
    )}
  />

)

export default IndexPage
