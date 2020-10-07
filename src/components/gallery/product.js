import React from 'react';

export default class Product extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            quantity: props.quantity,
            id: props.id,
            currency: props.currency,
            price: props.price,
            image: props.image,
            name: props.name,
            disabled: false,
        };
    }

    componentDidMount() {
        this.stripe = window.Stripe('pk_test_pSDUVreHtj3yJTvIGs2mtF1g00xJKPeSKp');

        // update props.price to be formatted so we don't repeat this logic on the cart page

        let str = localStorage.getItem('cart');

        // if cart/localStorage is not empty then compare state to localStorage
        if (str !== null) {
            let arr = JSON.parse(str);

            // check if this specific product is in localStorage
            let storedItem = arr.find(item => item.id === this.state.id);

            if (storedItem) {
                // if quantity doesn't match then set values equal to localStorage
                if (storedItem.quantity !== this.state.quantity) {
                    this.setState({
                        quantity: storedItem.quantity,
                        disabled: true
                    });
                }

            }

        }

    }

    // we want to add a clickable + and - so that users can update quantity
    // The Add To Cart button will add the selected quantity to the cart/localStorage
    // "In Cart" text will appear and buttons will be disabled 
    // possibly put increment and decrement logic into a HOC

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

    addToCart = () => {
        if (this.state.quantity === 0) {
            return;
        }
        // if localStorage is empty then disable the cart button, add the item and return
        // this should only run for the very first item added to cart
        // more logic to possibly put into a HOC
        let str = localStorage.getItem('cart');

        if (str === null) {

            this.setState({
                disabled: true
            });

            localStorage.setItem('cart', JSON.stringify([this.state]));
            console.log('First item state: ', this.state);
            console.log('First item: ', localStorage.getItem('cart'));
            return;
        }

        // if localStorage isn't empty then turn the string contents into an array
        let arr = JSON.parse(str);

        // check localStorage to see if the product has already been added
        let duplicate = arr.find(item => item.id === this.state.id);

        // disable the buttons, change the text and return if duplicate exists
        if (duplicate) {
            this.setState({
                disabled: true
            });

            return;
        }

        // push the current item to the cart if not a duplicate and disable the cart button
        arr.push(this.state);
        localStorage.setItem('cart', JSON.stringify(arr));

        this.setState({
            disabled: true
        });

        console.log("localStorage: ", localStorage.getItem('cart'));
        console.log('item state: ', this.state);
    }

    render() {
        // this has to do with formatting the price info we receive from stripe
        // save price to state and push that to localStorage so we don't have to repeat this logic in Cart
        const { currency, price, image, name } = this.props;

        const priceFloat = (price / 100).toFixed(2);
        const formattedPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumSignificantDigits: 2 }).format(priceFloat);

        // display a different button if product is already added to cart
        // disable quantity update buttons also

        let cartButton;

        if (this.state.disabled) {

            cartButton = <button onClick={this.addToCart} className="block m-2 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed">In Cart</button>;
        } else {

            cartButton = <button onClick={this.addToCart} className="block m-2 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded">Add to Cart</button>;
        }

        return (
            <div className="m-1 p-4">
                <img className="w-32 h-32 rounded object-cover" alt="product" src={image} />
                <p className="text-center"> {name} - {formattedPrice} </p>

                <button hidden={this.state.disabled} onClick={this.decrement} className="m-1 bg-teal-600 hover:bg-teal-700 text-white font-bold py-1 px-4 rounded">-</button>

                {this.state.quantity}

                <button hidden={this.state.disabled} onClick={this.increment} className="m-1 bg-teal-600 hover:bg-teal-700 text-white font-bold py-1 px-4 rounded">+</button>

                {cartButton}
            </div>
        )
    }
}