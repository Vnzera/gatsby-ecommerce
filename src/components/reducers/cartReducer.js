const cartReducer = (state, action) => {
    let newState;
    console.log('action: ', action);
    console.log('action state: ', state);

    switch (action.type) {
        case 'MERGE':
            // if state is empty then payload becomes newState
            if (state.length === 0) {
                newState = action.payload.map(item => {
                    return {
                        key: item.id,
                        id: item.id,
                        currency: item.currency,
                        price: item.price,
                        image: item.image,
                        name: item.name,
                        quantity: 0
                    }
                });
                console.log('merge: ', newState);
                localStorage.setItem('cart', JSON.stringify(newState));
                return newState;
            }

            // else merge localStorage with list of products/payload received from Stripe
            newState = action.payload.map(payloadItem => {

                // find matching local item
                const found = state.find(localItem => {
                    return payloadItem.id === localItem.id;
                });

                // if matching local item isn't found then add payload item
                if (!found) {
                    return payloadItem;
                } else {
                    // return payloadItem with updated quantity from localStorage
                    if (payloadItem.quantity !== found.quantity) {
                        payloadItem.quantity = found.quantity;
                        return payloadItem;
                    }
                }

                return payloadItem;
            });

            console.log('merged: ', newState);
            localStorage.setItem('cart', JSON.stringify(newState));

            return newState;

        case 'INCREMENT':
            // create a new cart array where that item is incremented
            newState = state.map(item => {
                if (item.id === action.payload.id) {
                    item.quantity + 1;
                    return item;
                } else {
                    return item;
                }
            });

            // sync to localStorage and return new state
            localStorage.setItem('cart', JSON.stringify(newState));

            return newState;

        case 'DECREMENT':
            // create a new cart array where that item is decremented
            newState = state.map(item => {
                if (item.id === action.payload.id) {
                    item.quantity - 1;
                    return item;
                } else {
                    return item;
                }
            });

            // sync to localStorage and return new state
            localStorage.setItem('cart', JSON.stringify(newState));

            return newState;

        case 'ZERO':
            // set all items quantity to 0 and return the new array
            newState = state.map(item => {
                item.quantity = 0;
                return item;
            });

            localStorage.setItem('cart', JSON.stringify(newState));

            return newState;

        default:
            return state;
    }
}

export default cartReducer;