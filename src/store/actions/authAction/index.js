function setUser(user) {
    console.log('auth wala action', user)
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