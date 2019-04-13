import React from "react";
import { MDBPagination, MDBPageItem, MDBPageNav, MDBCol, MDBRow } from "mdbreact";

export const Pagination = () => {
  return (
    <MDBRow>
      <MDBCol>
        <MDBPagination className="mb-5">
          <MDBPageItem disabled>
            <MDBPageNav aria-label="Previous">
              <span aria-hidden="true">Previous</span>
            </MDBPageNav>
          </MDBPageItem>
          <MDBPageItem active>
            <MDBPageNav>
              1 <span className="sr-only">(current)</span>
            </MDBPageNav>
          </MDBPageItem>
          <MDBPageItem>
            <MDBPageNav>2</MDBPageNav>
          </MDBPageItem>
          <MDBPageItem>
            <MDBPageNav>3</MDBPageNav>
          </MDBPageItem>
          <MDBPageItem>
            <MDBPageNav aria-label="Previous">
              <span aria-hidden="true">Next</span>
            </MDBPageNav>
          </MDBPageItem>
        </MDBPagination>
      </MDBCol>
    </MDBRow>
    )
}