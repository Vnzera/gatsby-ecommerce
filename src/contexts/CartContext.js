import React, { createContext, useState } from 'react';
import cartReducer from '../components/reducers/cartReducer';

export const CartContext = createContext();

// put request logic here and store response in state
// then compare response to localStorage data and sync quantity property

// may not need add to cart button on gallery page if increment/decrement functions are placed here
// maybe just a temporary message that says "added to cart"

const CartContextProvider = (props) => {
    // maybe one hook for cart state and another for product data received from Stripe
    // const [cart, dispatch] = useReducer(cartReducer, ...)
    const [cart, setCart] = useState([

    ]);

    // functions for incrementing/decrementing go here
    // syncStorage = () => {
    // make sure sku/id of each cart item can be found in Product data from Stripe
    // };

    // dispatch({ type: 'ADD_ONE'});

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

    return (
        <CartContext.Provider value={{ cart, increment, decrement }} >
            {props.children}
        </CartContext.Provider>
    )
}

export default CartContextProvider;
