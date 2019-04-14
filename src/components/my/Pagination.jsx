import React from "react";
import { MDBPagination, MDBPageItem, MDBPageNav, MDBCol, MDBRow } from "mdbreact";
import { connect } from 'react-redux';
import { setFiltes } from '../../store/ac';

class Pagination extends React.Component {

  onClick = (number) => () => {
    this.props.dispatch(setFiltes({
      currentPage: number,
    }));
  };
  

  render() {

    const {pagesCount, currentPage} = this.props;
    const pages = [];
    for (let i = 0; i < pagesCount; i++) {
      pages.push(i + 1);
    }

    return (
      <MDBRow>
        <MDBCol>
          <MDBPagination className="mb-5">

            <MDBPageItem
              disabled={+currentPage === 1 || this.props.isLoading === true}
              onClick={this.onClick(+currentPage - 1)}
              >
                <MDBPageNav aria-label="Previous">
                  <span aria-hidden>&laquo;</span>
                </MDBPageNav>
            </MDBPageItem>

            {pages.map(number => (
              <MDBPageItem
                active={number === +currentPage}
                disabled={this.props.isLoading === true}
                key={number + 'key'}
                onClick={this.onClick(number)}
                >
                  <MDBPageNav>
                    {number}
                  </MDBPageNav>
              </MDBPageItem>
            ))}

            <MDBPageItem
              disabled={+currentPage === +pagesCount || this.props.isLoading === true}
              onClick={this.onClick(+currentPage + 1)}
              >
                <MDBPageNav aria-label="Previous">
                  <span aria-hidden>&raquo;</span>
                </MDBPageNav>
            </MDBPageItem>

          </MDBPagination>
        </MDBCol>
      </MDBRow>
    )
  }
}


export default connect(
  store => ({
    currentPage: store.filters.currentPage,
    pagesCount: store.filters.pages,
    isLoading: store.loading,
  }),
)(Pagination);