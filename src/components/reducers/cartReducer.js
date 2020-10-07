const cartReducer = (state, action) => {
    switch (action.type) {
        case 'INCREMENT':
            // find item in state by comparing action.id to id/sku in state items

            // create a new cart array where that item is incremented, sync to localStorage and return it
            return

        case 'DECREMENT':
            // find item in state by comparing action.id to id/sku in state items

            // create a new cart array where that item is decremented, sync to localStorage and return it
            return

        case 'ZERO':
            // set all items quantity to 0 and return the new array
            return

        default:
            return state;
    }
}

export default cartReducer;