
function companyReducer(state = {}, action) {
    console.log('firebase data', action)
    console.log('company check', action)
    switch (action.type) {
        case ('SET_COMPANY'): {
            return { ...state, Company: action.data }
        }
        default: {
            return state
        }
    }
}
export default companyReducer