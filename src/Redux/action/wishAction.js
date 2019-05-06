const updateWish = (wish) => {
    return {
        type: "UPDATE_WISH",
        wish
    }
}


const removeWish = () => {
    return {
        type: "REMOVE_WISH"
    }
}


export {
    updateWish,
    removeWish
}