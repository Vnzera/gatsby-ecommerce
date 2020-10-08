import React, { createContext, useReducer, useEffect } from 'react';
import cartReducer from '../components/reducers/cartReducer';
import { graphql } from 'gatsby';


const API_KEY = process.env.STRIPE_SECRET_KEY;
const url = 'https://api.stripe.com/v1/products';

// const query = graphql`
// {
//     allStripeSku {
//         edges {
//         node {
//             id
//             currency
//             price
//             image
//             attributes {
//             name
//             }
//         }
//         }
//     }
// }`

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
        // retrieves all products from Stripe and dispatches "merge" action type
        fetch(url, {
            headers: {
                'Authorization': `bearer ${API_KEY}`
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
                console.log('payload: ', payload);
                // dispatch 'merge' action 
                dispatch({
                    type: 'MERGE',
                    payload
                });
            })
            .catch(error => {
                console.log(error);
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
