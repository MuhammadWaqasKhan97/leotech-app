const catgReducer = (state = {}, action) => {
    switch(action.type) {
        case "UPDATE_CATEGORIES": {
            return {...state, catg: action.catg}
        }

        default: {
            return state;
        }
    }
}

export default catgReducer