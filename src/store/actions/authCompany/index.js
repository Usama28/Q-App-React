import firebase from '../../../config/Firebase'

function setCompany() {
    return (dispatch) => {
        firebase.firestore().collection('Company Details')
            .onSnapshot((response) => {
                const list = []
                const IDs = []
                response.forEach(doc => {

                    IDs.push(doc.id)
                    console.log('user****', IDs)
                    localStorage.setItem('userIds', JSON.stringify(IDs))
                    list.push(doc.data())
                })

                dispatch({
                    type: 'SET_COMPANY',
                    data: list
                })
                console.log('list***', list)
            })
    }
}
export {
    setCompany
}