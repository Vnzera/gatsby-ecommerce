const cartReducer = (state, action) => {
    switch (action.type) {
        case 'INCREMENT':
            // create a new cart array where that item is incremented
            const newState = state.map(item => {
                if (item.id === action.item.id) {
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
                if (item.id === action.item.id) {
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