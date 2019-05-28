import React from 'react'
import logo from "../../assets/logo404.jpg";
const { MDBCol, MDBRow } = require('mdbreact');


const NotFoundPage =  () => {
  return (
    <React.Fragment>
      <div className="full">
        <MDBRow className="bad-gateway-row">
          <MDBCol md="8">
            <img alt="Error 404" className="img-fluid" src={logo}/>
            <h2 className="h2-responsive mt-3 mb-2">404. Ошибочка вышла.</h2>
            <h4>Данной страницы не существует.</h4>
          </MDBCol>
          <MDBCol md="4">
            <img alt="Error 404" className="img-fluid" src="https://mdbootstrap.com/img/Others/grafika404-bf.png"/>
          </MDBCol>
        </MDBRow>
      </div>
    </React.Fragment>
  )
}

export default NotFoundPage;