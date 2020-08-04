import React from 'react'
import Layout from '../components/layout';

// retrieve cart items from localStorage and display them
// add event handlers for changing quantity of each item and deleting items
// pass cart items to Stripe for payment page

export default function Cart() {
    return (
        <Layout>
            <p>Display cart items and their quantity here</p>
        </Layout>
    )
}