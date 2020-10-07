import React from 'react'
import Layout from '../components/layout';

// CartContext makes Stripe request and merges data with any old localStorage data 
// Stripe data could contain new inventory and localStorage could contain old inventory etc
// merge both so new items are included, old items are purged and quantity of items is in sync

// cart component will get state from CartContext and display items with quantity > 0
// gallery page will display all items
// both will be able to increment/decrement

// components for increment and decrement buttons
// component for subtotal calculation 
// component for deleting/zeroing out quantity for specific item
// component for checkout button
// set all items quantity to 0 on success page but not failure

class CartItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: props.quantity,
            id: props.id,
            currency: props.currency,
            price: props.price,
            image: props.image,
            name: props.name,
        };
    }

    increment = () => {
        this.setState({
            quantity: this.state.quantity + 1
        });
    };

    decrement = () => {
        if (this.state.quantity === 0) {
            return;
        }

        this.setState({
            quantity: this.state.quantity - 1
        });
    };

    render() {
        // same logic from index page
        const { currency, price, image, name } = this.props;

        const priceFloat = (price / 100).toFixed(2);
        const formattedPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumSignificantDigits: 2 }).format(priceFloat);

        return (
            <div className="flex justify-center m-1 p-4">

                <img className="w-32 h-32 rounded object-cover" alt="product" src={image} />
                <p className="text-center"> {name} - {formattedPrice} </p>

                <button onClick={this.decrement} className="m-1 bg-teal-600 hover:bg-teal-700 text-white font-bold py-1 px-4 rounded">-</button>

                {this.state.quantity}

                <button onClick={this.increment} className="m-1 bg-teal-600 hover:bg-teal-700 text-white font-bold py-1 px-4 rounded">+</button>

            </div>
        )
    }
}

class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: [],
            empty: false,
        };
    }

    componentDidMount() {
        this.stripe = window.Stripe('pk_test_pSDUVreHtj3yJTvIGs2mtF1g00xJKPeSKp');

        let str = localStorage.getItem('cart');

        if (str === null) {

            this.setState({
                empty: true
            });

            return;

        }

        let arr = JSON.parse(str);

        console.log('arr: ', arr);

        this.setState({
            cart: arr,
        });

    }

    handleSubmit(cart) {
        // make sure cart state quantity equals quantity 

        // we should not send entire state of product to Stripe so..
        // filter state so only items with quantity > 0 remain
        // and  only sku and quantity properties remain
        let filteredCart = cart.map((item) => {
            if (item.quantity > 0) {
                return { sku: item.id, quantity: item.quantity }
            }

        });

        return event => {
            event.preventDefault();

            this.stripe
                .redirectToCheckout({
                    // format for sending purchase data to stripe:
                    // items: [{ sku, quantity: 1 }],

                    items: filteredCart,

                    // Do not rely on the redirect to the successUrl for fulfilling
                    // purchases, customers may not always reach the success_url after
                    // a successful payment.
                    // Instead use one of the strategies described in
                    // https://stripe.com/docs/payments/checkout/fulfillment
                    successUrl: 'https://ecommerce-gatsbyjs.netlify.com/success',
                    cancelUrl: 'https://ecommerce-gatsbyjs.netlify.com/canceled',
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

        if (this.state.empty) {

            return (<Layout><div>Empty</div></Layout>)

        }

        return (
            <Layout>
                <div className="mx-auto my-20">
                    {this.state.cart.map((item) =>
                        <CartItem
                            key={item.id}
                            id={item.id}
                            currency={item.currency}
                            price={item.price}
                            image={item.image}
                            name={item.name}
                            quantity={item.quantity}
                        />
                    )}
                    <button onClick={this.handleSubmit(this.state.cart)} className="m-1 bg-teal-600 hover:bg-teal-700 text-white font-bold py-1 px-4 rounded">Checkout</button>
                </div>
            </Layout>
        )

    }

}



export default Cart;
