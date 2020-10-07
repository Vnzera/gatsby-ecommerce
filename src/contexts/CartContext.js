import React, { createContext, useReducer } from 'react';
import cartReducer from '../components/reducers/cartReducer';

// put request logic here and store response in state
// then compare response to localStorage data and sync quantity property

// may not need add to cart button on gallery page if increment/decrement functions are placed here
// maybe just a temporary message that says "added to cart"

const API_KEY = process.env.STRIPE_SECRET_KEY;
const url = 'https://api.stripe.com/v1/products/sk_test_gDzSxHcErlckm1CWqcU9KWfm00yx9imSNM:';

export const CartContext = createContext();

const CartContextProvider = (props) => {
    const [cart, dispatch] = useReducer(cartReducer, [], () => {
        // set carts default value to localStorage cart if it's not empty
        let localData = localStorage.getItem('cart');

        if (localData !== null) {
            return JSON.parse(localData);
        }

        return [];
    });

    useEffect(() => {
        stripe = window.Stripe('pk_test_pSDUVreHtj3yJTvIGs2mtF1g00xJKPeSKp');

        // retrieves all products from Stripe and dispatches "merge" action type
        fetch(url, {
            headers: {
                'x-api-key': API_KEY,
            },
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw Error('Error fetching product list!');
                }
            })
            .then(res => {
                const payload = res.data.map((product) => {
                    return {
                        key: product.id,
                        id: product.id,
                        currency: product.currency,
                        price: product.price,
                        image: product.image,
                        name: product.attributes.name,
                        quantity: 0
                    }
                });
                // dispatch 'merge' action 
                dispatch({
                    type: 'MERGE',
                    payload
                });
            })
            .catch(error => {
                setError(error);
            })
    }, []);

    return (
        <CartContext.Provider value={{ cart, dispatch }} >
            {props.children}
        </CartContext.Provider>
    )
}

export default CartContextProvider;
