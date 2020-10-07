import React from "react"
import Layout from "../components/layout"
import Product from "../components/gallery/product"
import SEO from "../components/seo"
import { StaticQuery, graphql } from 'gatsby';

const findQuantity = (id) => {
  // find item in localStorage and return quantity
  console.log('find quantity: ', id);
  // if not found then return 0
  return 0;
}

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

    // Context component itself could retrieve the data while Product and Cart pages would display it
    // use CartContextProvider to provide function that retrieves specific items quantity from CartContext
    // maybe use localStorage instead since it should be in sync with CartContext

    // maybe move Stripe request to CartContext
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
              quantity={findQuantity(sku.id)}
            />
          )}
        </div>
      </Layout>
    )}
  />

)

export default IndexPage
