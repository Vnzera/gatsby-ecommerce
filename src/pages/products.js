import React from 'react';
import Layout from '../components/layout';
import { StaticQuery, graphql } from 'gatsby';

class Product extends React.Component {
    componentDidMount() {
        this.stripe = window.Stripe('pk_test_pSDUVreHtj3yJTvIGs2mtF1g00xJKPeSKp');
    }

    handleSubmit(sku) {
        return event => {
            event.preventDefault();

            this.stripe
                .redirectToCheckout({
                    items: [{ sku, quantity: 1 }],

                    // Do not rely on the redirect to the successUrl for fulfilling
                    // purchases, customers may not always reach the success_url after
                    // a successful payment.
                    // Instead use one of the strategies described in
                    // https://stripe.com/docs/payments/checkout/fulfillment
                    successUrl: 'http://localhost:8000/success',
                    cancelUrl: 'http://localhost:8000/canceled',
                })
                .then(function (result) {
                    if (result.error) {
                        // If `redirectToCheckout` fails due to a browser or network
                        // error, display the localized error message to your customer.
                        var displayError = document.getElementById('error-message');
                        displayError.textContent = result.error.message;
                    }
                });
        }
    }

    render() {
        const { id, currency, price, name } = this.props;

        const priceFloat = (price / 100).toFixed(2);
        const formattedPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumSignificantDigits: 2 }).format(priceFloat);

        return (
            <form onSubmit={this.handleSubmit(id)}>
                <h2>{name} - {formattedPrice} </h2>
                <button type="submit">Purchase</button>
            </form>
        )
    }
}

export default () => (
    <StaticQuery
        query={graphql`
        {
            allStripeSku {
                edges {
                node {
                    id
                    currency
                    price
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
                {data.allStripeSku.edges.map(({ node: sku }) =>
                    <Product
                        id={sku.id}
                        currency={sku.currency}
                        price={sku.price}
                        name={sku.attributes.name}
                    />
                )}
            </Layout>
        )}
    />
)
