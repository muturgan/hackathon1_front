import React from 'react'
import { MDBCol, MDBRow, MDBCard, MDBCardBody, MDBCardHeader } from 'mdbreact';
import { Gallery } from '../rgg/Gallery';
import Selects from '../my/Selects';
import Modal from '../my/Modal';
import Pagination from '../my/Pagination';
import { connect } from 'react-redux';
import { loadingEnd, userLogout, newError, fetchImages } from '../../store/actions';
import { BASE_URL } from '../../store/base_url.js';


class GalleryPage extends React.Component {

  componentDidMount() {
    this.props.dispatch(fetchImages());
  }

  onSelectImage = async (index, image) => {
    if (this.props.token === null) {
      this.props.dispatch(newError({code: 'Авторизуйтесь пожалуйста', message: 'Только авторизованые пользователи могут оценивать изображения'}));
      return;
    }

    const images = this.props.images;
    const img = images[index];
    const endPoint = img.likedByYou ? 'dislike' : 'like';

    const data = await fetch(
      `${BASE_URL}/images/${img.id}/${endPoint}`,
      {
        method: 'PATCH',
        headers: {authorization: this.props.token},
      }
    ).then(res => res.json());

    if (data.success === false) {
      if (data.code === 419) {
        this.props.dispatch(userLogout());
      }

      this.props.dispatch(newError({code: data.code, message: data.message}));
      this.props.dispatch(loadingEnd());
      return;
    }
  
    img.likes = endPoint === 'like'
      ? img.likes + 1
      : img.likes - 1;
    img.isSelected = !!img.likes;
    img.likedByYou = !img.likedByYou;

    this.props.images[index] = img;
    this.forceUpdate();
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