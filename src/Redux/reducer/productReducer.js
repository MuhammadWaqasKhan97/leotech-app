const productReducer = (state = {}, action) => {
    switch(action.type) {
        case "UPDATE_PRODUCTS": {
            return {...state, Products: action.Products}
        }

        default: {
            return state;
        }
    }
}

export default productReducer