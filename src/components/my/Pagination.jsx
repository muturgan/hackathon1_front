import React from "react";
import { MDBPagination, MDBPageItem, MDBPageNav, MDBCol, MDBRow } from "mdbreact";

export const Pagination = (props) => {
  const {pagesCount, currentPage} = props;
  const pages = [];
  for (let i = 0; i < pagesCount; i++) {
    pages.push(i + 1);
  }

  return (
    <MDBRow>
      <MDBCol>
        <MDBPagination className="mb-5">

          {+currentPage === 1
            ? <MDBPageItem disabled>
                <MDBPageNav aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </MDBPageNav>
              </MDBPageItem>
            : <MDBPageItem>
              <MDBPageNav aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </MDBPageNav>
            </MDBPageItem>
          }

          {pages.map(number => (
            number === +currentPage
              ? <MDBPageItem active>
                  <MDBPageNav>
                    {number}
                  </MDBPageNav>
                </MDBPageItem>
              : <MDBPageItem>
                  <MDBPageNav>
                    {number}
                  </MDBPageNav>
                </MDBPageItem>
          ))}

          {+currentPage === +pagesCount
            ? <MDBPageItem disabled>
                <MDBPageNav aria-label="Previous">
                  <span aria-hidden="true">&raquo;</span>
                </MDBPageNav>
              </MDBPageItem>
            : <MDBPageItem>
              <MDBPageNav aria-label="Previous">
                <span aria-hidden="true">&raquo;</span>
              </MDBPageNav>
            </MDBPageItem>
          }

        </MDBPagination>
      </MDBCol>
    </MDBRow>
    )
}