import React from 'react'
import { MDBCol, MDBRow, MDBCard, MDBCardBody, MDBCardHeader } from 'mdbreact';
import { Gallery } from '../rgg/Gallery';
import Selects from '../my/Selects';
import Modal from '../my/Modal';
import Pagination from '../my/Pagination';
import { connect } from 'react-redux';
import { loadingEnd, userLogout, newError, fetchImages, voteForImage } from '../../store/actions';
import { BASE_URL } from '../../store/base_url.js';


class GalleryPage extends React.Component {

  componentDidMount() {
    if (this.props.images.length === 0) {
      this.props.dispatch(fetchImages());
    }
  }

  onSelectImage = (index, image) => {
    this.props.dispatch(voteForImage(index));
  }


  render() {
    return (
      <MDBRow>

        <Modal/>

        <MDBCol md="12">

          <MDBCard>
            <MDBCardHeader>Контролы</MDBCardHeader>
            <MDBCardBody
              className = "text-center"
              style={{ width: '100%'}}
            >
              <Selects/>
              <Pagination/>
            </MDBCardBody>
          </MDBCard>

          <MDBCard className="mt-3">
            <MDBCardHeader>Галерея</MDBCardHeader>
            <MDBCardBody
              className = "text-center"
              style={{ width: '100%'}}
            >
                <Gallery
                  images={this.props.images}
                  onSelectImage={this.onSelectImage}
                />
            </MDBCardBody>
  
          </MDBCard>
        </MDBCol>
      </MDBRow>
    );
  }
}


export default connect(
  store => ({
    token: store.user.token,
    isLoading: store.loading,
    filters: store.filters,
    images: store.images,
  }),
)(GalleryPage);