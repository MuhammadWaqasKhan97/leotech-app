const updateUser = (user) => {
    return {
        type: "UPDATE_USER",
        user
    }
}

const removeUser = () => {
    return {
        type: "REMOVE_USER"
    }
}

const data = (data) => {
    return {
        type: 'ADD_DATA',
        data
    }
}

export {
    updateUser,
    removeUser,
    data
}