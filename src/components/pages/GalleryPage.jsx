import React from 'react'
import { MDBCol, MDBRow, MDBCard, MDBCardBody, MDBCardHeader } from 'mdbreact';
import { Gallery } from '../rgg/Gallery';
import Selects from '../my/Selects';
import Modal from '../my/Modal';
import Pagination from '../my/Pagination';
import { connect } from 'react-redux';
import { loadingStart, loadingEnd, setFiltes, userLogout, newError } from '../../store/ac';
import { BASE_URL } from '../../store/base_url.js';


class GalleryPage extends React.Component {

  constructor() {
    super();

    this.state = {
      images: [],
    };
  }

  componentDidMount() {
    this.fetchImages(this.props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.token !== this.props.token) {
      this.fetchImages(nextProps);
    }

    if (Object.keys(nextProps.filters).every(key => this.props.filters[key] === nextProps.filters[key]) ) {
      return false;
    }

    if (
      nextProps.filters.sortBy !== this.props.filters.sortBy
      || nextProps.filters.limit !== this.props.filters.limit
      || nextProps.filters.currentPage !== this.props.filters.currentPage
      || nextProps.filters.direction !== this.props.filters.direction
      || nextProps.filters.tag !== this.props.filters.tag
    ) {this.fetchImages(nextProps)}
    return true;
  }

  fetchImages = async (props) => {
    this.props.dispatch(loadingStart());
    const {sortBy, limit, currentPage, direction, tag} = props.filters;

    const data = await fetch(
        `${BASE_URL}/images?sortBy=${sortBy}&limit=${limit}&page=${currentPage}&direction=${direction}&tag=${tag}`,
        {
          headers: props.token !== null
            ? {authorization: props.token}
            : {},
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

    this.setState({
      images: data.images.map(image => ({
        id: image.id,
        src: image.path,
        thumbnail: image.path,
        tags: image.tags,
        likes: image.likes,
        likedByYou: image.likedByYou,
        isSelected: !!image.likes,
        caption: image.name,
        thumbnailWidth: 320,
        thumbnailHeight: 320,
      })),
    });

    this.forceUpdate();

    this.props.dispatch(setFiltes({
      pages: data.pages,
    }));

    this.props.dispatch(loadingEnd());
  };


  onSelectImage = async (index, image) => {
    if (this.props.token === null) {
      this.props.dispatch(newError({code: 'Авторизуйтесь пожалуйста', message: 'Только авторизованые пользователи могут оценивать изображения'}));
      return;
    }

    const images = this.state.images.slice();
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

    this.state.images[index] = img;
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
                  images={this.state.images}
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