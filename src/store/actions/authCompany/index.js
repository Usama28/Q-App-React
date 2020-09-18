import firebase from '../../../config/Firebase'

function setCompany() {
    return (dispatch) => {
        firebase.firestore().collection('Company Details').onSnapshot((response) => {
            const list = []
            response.forEach(doc => {
                list.push(doc.data())
            })
            console.log('list***', list)
            dispatch({
                type: 'SET_COMPANY',
                data: list
            })
        })
    }
}
export {
    setCompany
}