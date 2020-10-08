import React from 'react'
import { Grid, Image, Table, Header } from 'semantic-ui-react'
import firebase from '../../config/Firebase'

function companyTokens() {

 //code for modal
  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    dimmer: undefined,
  });
  const { open, dimmer } = state;
  const square = { width: 175, height: 175 };

  const { showCompany } = props;
  const [tokeValue, setTokenValue] = useState('')
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [ptImage, setPtImage] = useState('')
  const [imageAsFile, setImgFile] = useState("")
  const [indexValue, setindexValue] = useState("")
  const tokenList = []
  const IDsObj = JSON.parse(localStorage.getItem("userIds"));

  firebase.firestore().collection("Company Details").onSnapshot((response) => {
    response.forEach((docs) => {
      tokenList.push(docs.data().token)
    })
  })

  //delete specific token value
  const getToken = function (object, index) {
    setindexValue(IDsObj[index])
    var deleteRef = firebase.firestore().collection('Company Details').doc(IDsObj[index]);
    var removeCapital = deleteRef.update({
      token: firebase.firestore.FieldValue.delete()
    });
    setTokenValue(object.token - 1)
    dispatch({ type: 'OPEN_MODAL' })
  }

  // patient data to firebase
  const uploadImage = (e) => {
    if (e.target.files[0]) {
      setImgFile(e.target.files[0]);
    }
  };
  const patientData = function () {

    const uploadTask = storage.ref(`/PatientImages/${imageAsFile.name}`).put(imageAsFile);
    uploadTask.on("state_changed",
      (snapShot) => { },
      (err) => { },
      () => {
        storage.ref("PatientImages").child(imageAsFile.name).getDownloadURL()
          .then((fireBaseUrl) => {
            firebase
              .firestore()
              .collection("Patient Details")
              .add({
                name,
                number,
                ptImage: fireBaseUrl,
              })
              .then(function () {
                setName("");
                setNumber("");
                setPtImage("");
                var washingtonRef = firebase.firestore().collection("Company Details")
                  .doc(indexValue);
                return washingtonRef
                  .update({
                    token: tokeValue
                  })
                  .then(function () {
                    console.log("Document successfully updated!");
                    dispatch({ type: "CLOSE_MODAL" });
                  })
                  .catch(function (error) {
                    // The document probably doesn't exist.
                    alert("Error updating document: ", error.message);
                  });

              });
          })
          .catch((e) => {
            console.log(e.message);
          });
      })



  }
    return (
        <div>
            WELCOME
        </div>
    )
}

const mapStateToProps = (state) => {
  console.log("map state from component", state);
  return {
    showCompany: state.companyReducer.Company,
  };
};

export default connect(mapStateToProps, null)(CompanyTokens);
