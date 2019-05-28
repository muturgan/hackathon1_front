import React from 'react'
import { Gallery } from '../rgg/Gallery';
import Selects from '../my/Selects';
import Modal from '../my/Modal';
import Pagination from '../my/Pagination';
import { connect } from 'react-redux';
import { fetchImages, voteForImage } from '../../store/actions';
import { storeType } from '../../store/store';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { imageType, filtersType } from '../../custom_types';
const { MDBCol, MDBRow, MDBCard, MDBCardBody, MDBCardHeader } = require('mdbreact');

type GalleryPageProps = {
  token: string|null;
  isLoading: boolean;
  filters: filtersType;
  images: Array<imageType>;
	dispatch: ThunkDispatch<storeType, {}, AnyAction>;
}


class GalleryPage extends React.Component<GalleryPageProps, {}> {

  componentDidMount() {
    if (this.props.images.length === 0) {
      this.props.dispatch(fetchImages());
    }
  }

  onSelectImage = (index: number, image: HTMLElement) => {
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
  (store: storeType) => ({
    token: store.user.token,
    isLoading: store.loading,
    filters: store.filters,
    images: store.images,
  }),
)(GalleryPage);