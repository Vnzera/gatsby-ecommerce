const cartReducer = (state, action) => {
    switch (action.type) {
        case 'MERGE':
            // merge localStorage with list of products received from Stripe
            const newState = state.map(item => {
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
            })

        case 'INCREMENT':
            // create a new cart array where that item is incremented
            const newState = state.map(item => {
                if (item.id === action.payload.id) {
                    item.quantity + 1;
                    return item;
                }
            });

            // sync to localStorage and return new state
            localStorage.setItem('cart', JSON.stringify(newState));

            return newState;

        case 'DECREMENT':
            // create a new cart array where that item is decremented
            const newState = state.map(item => {
                if (item.id === action.payload.id) {
                    item.quantity - 1;
                    return item;
                }
            });

            // sync to localStorage and return new state
            localStorage.setItem('cart', JSON.stringify(newState));

            return newState;

        case 'ZERO':
            // set all items quantity to 0 and return the new array
            const newState = state.map(item => {
                item.quantity = 0;
                return item;
            });

            return newState;

        default:
            return state;
    }
}

export default cartReducer;