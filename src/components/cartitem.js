import React from 'react';

const CartItem = (props) => {
    const { currency, quantity, price, image, name, id, dispatch } = props;

    const total = price * quantity;
    const totalPriceFloat = (total / 100).toFixed(0);
    const totalFormattedPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumSignificantDigits: 2 }).format(totalPriceFloat);


    const increment = () => {
        dispatch({
            type: 'INCREMENT',
            payload: {
                id
            }
        })
    }

    const decrement = () => {
        dispatch({
            type: 'DECREMENT',
            payload: {
                id
            }
        })
    }

    const remove = () => {
        dispatch({
            type: 'REMOVE',
            payload: {
                id
            }
        })
    }

    return (
        <div className="block m-1 p-4">

            <img className="w-32 h-32 m-auto rounded object-cover" alt="product" src={image} />
            <p className="text-center m-1"> {name}  </p>
            <p className="mx-auto my-1">{totalFormattedPrice}</p>

            <button onClick={decrement} className="m-1 bg-teal-600 hover:bg-teal-700 text-white font-bold py-1 px-4 rounded">-</button>

            <p className="inline m-1">{quantity}</p>

            <button onClick={increment} className="m-1 bg-teal-600 hover:bg-teal-700 text-white font-bold py-1 px-4 rounded">+</button>

            <button onClick={remove} className="block m-auto my-2 bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-4 rounded">X</button>

        </div>
    )
}

export default CartItem;