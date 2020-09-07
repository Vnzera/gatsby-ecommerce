import React from 'react'
import Layout from '../components/layout';

// retrieve cart items from localStorage and display them
// add event handlers for changing quantity of each item and deleting items
// pass cart items to Stripe for payment page

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
    // we want to add a clickable + and - so that users can update quantity

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
        // this has to do with formatting the price info
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

    render() {

        if (this.state.empty) {

            return (<div>Empty</div>)

        }

        return (
            <Layout>
                <div className="flex flex-col  my-20">
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
                </div>
            </Layout>
        )

    }

}



export default Cart;


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