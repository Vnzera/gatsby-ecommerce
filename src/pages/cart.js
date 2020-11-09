import React from 'react';
import Layout from '../components/layout';
import CartItem from '../components/cartitem';
import { CartContext } from '../context/CartContext';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_pSDUVreHtj3yJTvIGs2mtF1g00xJKPeSKp');

class Cart extends React.Component {
    static contextType = CartContext;

    handleSubmit = async (cart) => {
        const stripe = await stripePromise;
        let filteredCart = cart.map(item => {
            return { sku: item.id, quantity: item.quantity }
        });

        const { error } = await stripe.redirectToCheckout({
            items: filteredCart,
            // successUrl: 'https://localhost:8000/success',
            // cancelUrl: 'https://localhost:8000/canceled',
            successUrl: 'https://ecommerce-gatsbyjs.netlify.com/success',
            cancelUrl: 'https://ecommerce-gatsbyjs.netlify.com/canceled',
            shippingAddressCollection: {
                allowedCountries: ['US'],
            }
        });

        console.log('error: ', error);
    }

    render() {
        const { cart, dispatch } = this.context;

        let cartList = cart.filter(item => {
            return item.quantity > 0;
        });

        let cartTotal = cartList.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);

        if (cartList.length === 0) {

            return (
                <Layout>
                    <div className="mx-auto my-20">
                        <p className="m-64">Your cart is empty</p>
                    </div>
                </Layout>)

        }

        return (
            <Layout>
                <div className="mx-auto my-20">
                    {cartList.map((item) =>
                        <CartItem
                            key={item.id}
                            id={item.id}
                            currency={item.currency}
                            price={item.price}
                            image={item.image}
                            name={item.name}
                            quantity={item.quantity}
                            dispatch={dispatch}
                        />
                    )}
                    <button onClick={() => this.handleSubmit(cartList)} className="m-1 bg-teal-600 hover:bg-teal-700 text-white font-bold py-1 px-4 rounded">Checkout</button>
                    <button
                        className="m-1 bg-teal-600 hover:bg-teal-700 text-white font-bold py-1 px-4 rounded">
                        Total: ${cartTotal / 100}
                    </button>
                </div>
            </Layout>
        )

    }

}



export default Cart;

// const CartPage = () => {
//     const { cart, dispatch } = useContext(CartContext);

//     let str = localStorage.getItem('cart');
//     let arr = JSON.parse(str);

//     let filteredCart = arr.filter(item => {
//         return item.quantity > 0;
//     });

//     let empty = filteredCart.length ? false : true;

//     useEffect(() => {
//         filteredCart = arr.filter(item => {
//             return item.quantity > 0;
//         });

//         empty = filteredCart.length ? false : true;

//     }, []);

//     function handleSubmit(filteredCart) {
//         // filter state so only items with quantity > 0 remain
//         // and  only sku and quantity properties remain
//         let cartOrder = filteredCart.map(item => {
//             return { sku: item.id, quantity: item.quantity };

//         });

//         return event => {
//             event.preventDefault();

//             stripePromise
//                 .redirectToCheckout({
//                     // format for sending purchase data to stripe:
//                     // items: [{ sku, quantity: 1 }],
//                     items: cartOrder,

//                     // Do not rely on the redirect to the successUrl for fulfilling
//                     // purchases, customers may not always reach the success_url after
//                     // a successful payment.
//                     // Instead use one of the strategies described in
//                     // https://stripe.com/docs/payments/checkout/fulfillment
//                     successUrl: 'https://ecommerce-gatsbyjs.netlify.com/success',
//                     cancelUrl: 'https://ecommerce-gatsbyjs.netlify.com/canceled',
//                 })
//                 .then(function (result) {
//                     if (result.error) {
//                         // If `redirectToCheckout` fails due to a browser or network
//                         // error, display the localized error message to your customer.
//                         var displayError = document.getElementById('error-message');
//                         displayError.textContent = result.error.message;
//                     }
//                 });
//         };
//     }

//     const Empty = () => {
//         return (
//             <Layout>
//                 <div>
//                     <p>Cart is Empty!</p>
//                 </div>
//             </Layout>
//         )
//     }

//     const Display = () => {
//         return (
//             <Layout>
//                 <div className="mx-auto my-20">
//                     {filteredCart.map(item => {
//                         <CartItem
//                             key={item.id}
//                             id={item.id}
//                             currency={item.currency}
//                             price={item.price}
//                             image={item.image}
//                             name={item.name}
//                             quantity={item.quantity}
//                             dispatch={dispatch}
//                         />
//                     })}
//                     <button onClick={handleSubmit(filteredCart)} className="m-1 bg-teal-600 hover:bg-teal-700 text-white font-bold py-1 px-4 rounded">Checkout</button>
//                 </div>
//             </Layout>
//         )
//     }

//     return (
//         <>
//             {empty ? (
//                 <Empty />
//             ) : (
//                     <Display />
//                 )}
//         </>
//     )
// }

// export default CartPage;
