//state is iniitally a store
function AuthReducer(state = {}, action) {
    console.log('auth wala reducer', action)
    switch (action.type) {

        case 'SET_USER': {
            return { ...state, user: action.data }
        }
        case 'UNSET_USER': {
            return { ...state, user: null }
        }
        default: {
            return state
        }
    }
}

export default AuthReducer