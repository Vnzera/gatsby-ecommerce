import React, { createContext, useReducer, useEffect } from 'react';
import cartReducer from '../components/reducers/cartReducer';

const API_KEY = process.env.STRIPE_SECRET_KEY;
const url = 'https://api.stripe.com/v1/skus';

// you could move request logic to the Product page
// Product page would request data from Stripe and dispatch stripe response 
// using an action of type MERGE

// cart page would use localStorage by default

export const CartContext = createContext();

const CartContextProvider = (props) => {
    let stripeResponse;

    const [cart, dispatch] = useReducer(cartReducer, [], () => {

        let localDataString = localStorage.getItem('cart');

        if (localDataString === null) {
            return [];
        } else {
            return JSON.parse(localDataString);
        }
    });

    useEffect(() => {
        fetch(url, {
            headers: {
                "Authorization": `Bearer ${API_KEY}`
            },
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw Error('Error fetching the news!');
                }
            })
            .then(res => {
                console.log('response: ', res);
                stripeResponse = res.data.map((stripeSku) => {
                    return {
                        key: stripeSku.id,
                        id: stripeSku.id,
                        currency: stripeSku.currency,
                        price: stripeSku.price,
                        image: stripeSku.image,
                        name: stripeSku.attributes.name,
                        quantity: 0
                    }
                });
                console.log('stripeResponse: ', stripeResponse);
                dispatch({
                    type: 'MERGE',
                    payload: stripeResponse
                })
                return stripeResponse;
            })
            .catch(error => {
                console.log('error: ', error);
            })
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
