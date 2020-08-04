import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { StaticQuery, graphql } from 'gatsby';

// .redirectToCheckout logic will be moved to the cart page


// function Product (props) {
//   return (
//     <div>

//     </div>
//   )
// }


class Product extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  componentDidMount() {
    this.stripe = window.Stripe('pk_test_pSDUVreHtj3yJTvIGs2mtF1g00xJKPeSKp');
  }

  // we want to add a clickable + and - so that users can update quantity
  // The Add To Cart button will add the selected quantity to the cart/localStorage
  // "In Cart" text will appear next to item if added

  increment = () => {
    this.setState({
      count: this.state.count + 1
    });
  };

  decrement = () => {
    if (this.state.count === 0) {
      return;
    }

    this.setState({
      count: this.state.count - 1
    });
  };

  // handleSubmit(sku) {
  //   return event => {
  //     event.preventDefault();

  //     this.stripe
  //       .redirectToCheckout({
  //         // grab quantity from localStorage
  //         items: [{ sku, quantity: 1 }],

  //         // Do not rely on the redirect to the successUrl for fulfilling
  //         // purchases, customers may not always reach the success_url after
  //         // a successful payment.
  //         // Instead use one of the strategies described in
  //         // https://stripe.com/docs/payments/checkout/fulfillment
  //         successUrl: 'https://ecommerce-gatsbyjs.netlify.com/success',
  //         cancelUrl: 'https://ecommerce-gatsbyjs.netlify.com/canceled',
  //       })
  //       .then(function (result) {
  //         if (result.error) {
  //           // If `redirectToCheckout` fails due to a browser or network
  //           // error, display the localized error message to your customer.
  //           var displayError = document.getElementById('error-message');
  //           displayError.textContent = result.error.message;
  //         }
  //       });
  //   }
  // }

  render() {
    // this has to do with formatting the price info we receive from stripe
    const { id, currency, price, image, name } = this.props;

    const priceFloat = (price / 100).toFixed(2);
    const formattedPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumSignificantDigits: 2 }).format(priceFloat);

    return (
      <div className="m-1 p-4"
      // onSubmit={this.handleSubmit(id)}
      >
        <img className="w-32 h-32 rounded object-cover" alt="product" src={image} />
        <p className="text-center"> {name} - {formattedPrice} </p>

        <button onClick={this.increment} className="m-1 bg-teal-600 hover:bg-teal-700 text-white font-bold py-1 px-4 rounded">+</button>

        {this.state.count}

        <button onClick={this.decrement} className="m-1 bg-teal-600 hover:bg-teal-700 text-white font-bold py-1 px-4 rounded">-</button>

        <button className="m-2 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded">Add to Cart</button>
      </div>
    )
  }
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

    // ({ node: sku }) changes the node alias to sku for ergonomics
    // otherwise, we could proceed with node.id, node.currency instead
    render={data => (
      <Layout>
        <SEO title="Home" />
        <div className="flex flex-row flex-wrap flex-auto justify-center mx-auto my-20">
          {data.allStripeSku.edges.map(({ node: sku }) =>
            <Product
              id={sku.id}
              currency={sku.currency}
              price={sku.price}
              image={sku.image}
              name={sku.attributes.name}
            />
          )}
        </div>
      </Layout>
    )}
  />

)

export default IndexPage
