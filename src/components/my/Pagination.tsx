import React from "react";
import { connect } from 'react-redux';
import { setFiltes } from '../../store/actions';
import { storeState } from '../../store/store';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
const { MDBPagination, MDBPageItem, MDBPageNav, MDBCol, MDBRow } = require('mdbreact');

type PaginationProps = {
  currentPage: number;
  pagesCount: number;
  isLoading: boolean;
	dispatch: ThunkDispatch<storeState, {}, AnyAction>;
};



class Pagination extends React.Component<PaginationProps, {}> {

  onClick = (number: number) => () => {
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
          <MDBPagination className="mb-1 mt-2">

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
  (store: storeState) => ({
    currentPage: store.filters.currentPage,
    pagesCount: store.filters.pages,
    isLoading: store.loading,
  }),
)(Pagination);