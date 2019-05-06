const updateCart = (cart) => {
    return {
        type: "UPDATE_CART",
        cart
    }
}

const removeCartItem = () => {
    return {
        type: "REMOVE_CART_ITEM",
        cart
    }
}

const removeCart = () => {
    return {
        type: "REMOVE_CART"
        }
}


export {
    updateCart,
    removeCartItem,
    removeCart
}