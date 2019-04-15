import React from 'react'
import { MDBCol, MDBRow, MDBCard, MDBCardBody } from 'mdbreact';



export default class InfoPage extends React.Component {


  render() {
    return (
      <MDBRow>
        <MDBCol md="12">
          <MDBCard className="mt-5">
            <MDBCardBody
              className = "text-center"
              style={{ width: '100%'}}
            >
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    );
  }
}