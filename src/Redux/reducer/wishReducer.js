const wishReducer = (state = {}, action) => {
    switch(action.type) {
        case "UPDATE_WISH": {
            return {...state, wish: action.wish}
        }

        case "REMOVE_WISH": {
            return {...state, wish: null}
        }

        default: {
            return state;
        }
    }
}

export default wishReducer