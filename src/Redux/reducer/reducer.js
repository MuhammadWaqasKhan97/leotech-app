const reducer = (state = {}, action) => {
    switch(action.type) {
        case "UPDATE_USER": {
            return {...state, user: action.user}
        }
        case "REMOVE_USER": {
            return {...state, user: null}
        }
        case "ADD_DATA": {
            return {...state, data: action.data}
        }
        case "UPDATE_CART": {
            return {...state, cart: action.cart}
        }
        case "REMOVE_CART_ITEM": {
            return {...state, cart: action.cart}
        }

        case "REMOVE_CART": {
            return {...state, cart: null}
        }

        default: {
            return state;
        }
    }
}

export default reducer