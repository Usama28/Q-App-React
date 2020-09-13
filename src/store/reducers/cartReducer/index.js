//state is iniitally a store
function CartReducer(state = {}, action) {
    console.log('cart wala reducer', action)
    switch (action.type) {

        case 'SET_CART': {
            return { ...state, cart: action.data }
        }
        case 'UNSET_CART': {
            return { ...state, cart: null }
        }
        default: {
            return state
        }
    }
}

export default CartReducer