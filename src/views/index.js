import React, { useState } from "react";
import { Grid, Segment, Header, Button, Modal, Form } from "semantic-ui-react";
import firebase, { storage } from "../../config/Firebase";
import { connect } from "react-redux";
import swal from 'sweetalert'

//function for modal no logics
function exampleReducer(state, action) {
  switch (action.type) {
    case "OPEN_MODAL":
      return { open: true, dimmer: action.dimmer };
    case "CLOSE_MODAL":
      return { open: false };
    default:
      throw new Error();
  }
}

function CompanyTokens(props) {

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
      <Grid columns={1} raised>
        <Grid.Row>
          {showCompany.map((item, index) => {
            return (
              <Grid.Column
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "5%",
                  marginLeft: "5%",
                }}
              >
                <Segment color="black">
                  <Header as="h1">{item.companyName}</Header>

                  <Segment circular style={square}>
                    <Header as="h4">
                      Tokens Remaining
                      <Header.Subheader>{item.token}</Header.Subheader>
                      {/* {!showToken && <Header.Subheader>{item.token}</Header.Subheader>}
                      {showToken && <Header.Subheader>{item.token}</Header.Subheader>} */}
                    </Header>
                  </Segment>
                  <Segment circular inverted style={square}>
                    <Header as="h4" inverted>
                      Time forEach Token
                      <Header.Subheader>{item.time} minutes</Header.Subheader>
                    </Header>
                  </Segment>
                  <Button
                    color='grey'
                    onClick={() => { getToken(item, index) }}
                    style={{ margin: '5% 0% 5% 32%' }}
                  >Get Token</Button>

                </Segment>
              </Grid.Column>
            );
          })}
        </Grid.Row>
        <Modal
          style={{
            width: 380,
            height: 422,
          }}
          dimmer={dimmer}
          open={open}
          onClose={() => dispatch({ type: 'CLOSE_MODAL' })}
        >
          <Modal.Header>Fill The Details</Modal.Header>
          <Modal.Content>
            <Form>
              <Segment style={{ padding: "4%" }}>
                <Form.Group widths="equal">
                  <Form.Input
                    fluid
                    label="Name"
                    type='text'
                    placeholder="Enter name of patient"
                    onChange={(e) => { setName(e.target.value) }}
                  />
                </Form.Group>

                <Form.Group widths="equal">
                  <Form.Input
                    fluid
                    label="Contact"
                    text='number'
                    placeholder="Enter contact number"
                    onChange={(e) => { setNumber(e.target.value) }}
                  />
                </Form.Group>

                <Form.Group widths="equal">
                  <Form.Input
                    fluid
                    label="Image"
                    type="file"
                    placeholder="Enter image"
                    onChange={uploadImage}
                  />
                </Form.Group>
              </Segment>
            </Form>
          </Modal.Content>
          <Modal.Actions style={{ display: "flex", justifyContent: "center" }}>
            <Button secondary onClick={patientData}>
              Submit
          </Button>
          </Modal.Actions>
        </Modal>
      </Grid>
    </div>
  );
}
const mapStateToProps = (state) => {
  console.log("map state from component", state);
  return {
    showCompany: state.companyReducer.Company,
  };
};

export default connect(mapStateToProps, null)(CompanyTokens);
