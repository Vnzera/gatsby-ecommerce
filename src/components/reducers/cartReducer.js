const cartReducer = (state, action) => {
    let newState;
    switch (action.type) {
        case 'MERGE':
            // if state is empty then payload becomes newState
            if (state.length === 0) {
                console.log('merged: ', action.payload);
                localStorage.setItem('cart', JSON.stringify(action.payload));
                return action.payload;
            }

            // merge localStorage with list of products/payload received from Stripe
            newState = state.map(item => {

                // find matching payload item
                const found = action.payload.find(payloadItem => {
                    return payloadItem.id === item.id;
                });

                // return item with updated quantity from localStorage
                if (item.quantity !== found.quantity) {
                    item.quantity = found.quantity;
                    return item;
                }

                return item;
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