import React, { createContext, useReducer } from 'react';
import cartReducer from '../components/reducers/cartReducer';

// put request logic here and store response in state
// then compare response to localStorage data and sync quantity property

// may not need add to cart button on gallery page if increment/decrement functions are placed here
// maybe just a temporary message that says "added to cart"

export const CartContext = createContext();

const CartContextProvider = (props) => {
    const [cart, dispatch] = useReducer(cartReducer, []);

    return (
        <CartContext.Provider value={{ cart, dispatch }} >
            {props.children}
        </CartContext.Provider>
    )
}

export default CartContextProvider;
