import React from 'react'
import { Grid, Image, Table, Header } from 'semantic-ui-react'
import firebase from '../../config/Firebase'

function companyTokens() {


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
