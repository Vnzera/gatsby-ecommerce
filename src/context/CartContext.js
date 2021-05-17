import React, { createContext, useReducer, useEffect } from 'react';
import cartReducer from '../components/reducers/cartReducer';
import defaultState from './defaultState';

const API_KEY = process.env.GATSBY_STRIPE_SECRET_KEY;
const url = 'https://api.stripe.com/v1/skus';

export const CartContext = createContext();

const CartContextProvider = (props) => {
    // set initial state equal to localStorage or defaultState
    // let stripeResponse;

    const [cart, dispatch] = useReducer(cartReducer, [], () => {

        // check if localStorage is available
        if (typeof window !== 'undefined') {
            let localDataString = localStorage.getItem('cart');

            // use localStorage as initial state
            if (localDataString === null) {
                return defaultState;
            } else {
                return JSON.parse(localDataString);
            }

        } else {
            return defaultState;
        }

    });
    // API call for product data from Stripe
    useEffect(() => {

        // temporarily merging defaultState with localStorage by default to avoid api calls
        dispatch({
            type: 'MERGE',
            payload: defaultState
        })

        //     fetch(url, {
        //         headers: {
        //             "Authorization": `Bearer ${API_KEY}`
        //         },
        //     })
        //         .then(res => {
        //             if (res.ok) {
        //                 return res.json();
        //             } else {
        //                 throw Error('Error fetching the news!');
        //             }
        //         })
        //         .then(res => {
        //             console.log('response: ', res);
        //             // stripeResponse will be used to update state
        //             stripeResponse = res.data.map((stripeSku) => {
        //                 return {
        //                     key: stripeSku.id,
        //                     id: stripeSku.id,
        //                     currency: stripeSku.currency,
        //                     price: stripeSku.price,
        //                     image: stripeSku.image,
        //                     name: stripeSku.attributes.name,
        //                     quantity: 0
        //                 }
        //             });
        //             console.log('stripeResponse: ', stripeResponse);
        //             // dispatch an action to merge product data from Stripe with initial state from localStorage
        //             dispatch({
        //                 type: 'MERGE',
        //                 payload: stripeResponse
        //             })
        //             return stripeResponse;
        //         })
        //         .catch(error => {
        //             console.log('error: ', error);
        //         })
    }, []);

    return (
        <CartContext.Provider value={{ cart, dispatch }} >
            {props.children}
        </CartContext.Provider>
    )
}

export default ({ element }) => (
    <CartContextProvider>
        {element}
    </CartContextProvider>
);
