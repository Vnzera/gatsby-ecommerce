import React from 'react'
import Layout from '../components/layout';

// retrieve cart items from localStorage and display them
// add event handlers for changing quantity of each item and deleting items
// pass cart items to Stripe for payment page

export default function Cart() {
    return (
        <Layout>
            <p>Display cart items and their quantity here</p>
        </Layout>
    )
}
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