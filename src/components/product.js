import React, { useEffect, useState } from 'react';

const Product = (props) => {
    const { name, image, currency, price, quantity, dispatch } = props;
    // check whether product is in cart/localStorage or not
    const [added, setAdded] = useState(() => {
        // if the quantity is > 0 then item is in cart and cart button should be disabled
        if (quantity > 0) {
            return true;
        } else {
            return false;
        }
    });

    // format the price data received from Stripe
    const priceFloat = (price / 100).toFixed(2);
    const formattedPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: currency, maximumSignificantDigits: 2 }).format(priceFloat);

    const addToCart = () => {
        console.log('addToCart ran');
        // item is now in cart and CartContext should increment quantity by 1
        setAdded(true);
        dispatch({
            type: 'INCREMENT',
            payload: {
                id: props.id
            }
        });

    }

    const CartButton = () => {
        console.log('CartButton ran');
        // if item is already in cart then disable the AddToCart button
        if (added) {
            return (<button className="block m-auto bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed">In Cart</button>);
        } else {
            return (<button onClick={addToCart} className="block m-auto bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded">Add to Cart</button>);
        }
    }

    useEffect(() => {
        // grab quantity from localStorage in case CartContext wasn't able to
        let str = localStorage.getItem('cart');

        // if cart/localStorage is not empty then compare state to localStorage
        if (str !== null) {
            let arr = JSON.parse(str);

            // check if this specific product is in localStorage
            let storedItem = arr.find(item => item.id === props.id);

            if (storedItem) {
                // if quantity doesn't match then set values equal to localStorage
                if (storedItem.quantity !== quantity) {
                    quantity = storedItem.quantity;

                    if (quantity > 0) {
                        // if value is > 0 then the item is in cart already
                        console.log('product useEffect quantity: ', quantity);
                        setAdded(true);
                    }
                }
            }
        }

    }, []);

    return (
        <div className="m-1 p-4">
            <img className="w-32 h-32 rounded object-cover" alt="product" src={image} />
            <p className="text-center m-1"> {name}  </p>
            <button className="block mx-auto mb-1 bg-black hover:bg-black text-white font-bold py-1 px-4 rounded"> {formattedPrice}</button>
            {CartButton()}
        </div>
    )
}

export default Product;
