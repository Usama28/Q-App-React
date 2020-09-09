function setUser(user) {
    return {
        type: 'SET_USER',
        data: user
    }
}

function unsetUser() {
    return {
        type: 'UNSET_USER'
    }
}

export {
    setUser,
    unsetUser
}