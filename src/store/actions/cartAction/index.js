
function setCart(uscartData) {
    console.log('cart wala action', uscartData)
    return {
        type: 'SET_CART',
        data: user
    }
}

function unsetCart() {
    return {
        type: 'UNSET_CART'
    }
}

export {
    setCart,
    unsetCart
}