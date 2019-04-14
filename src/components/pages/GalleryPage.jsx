import React from 'react'
import { MDBCol, MDBRow, MDBCard, MDBCardBody } from 'mdbreact';
import { Gallery } from '../rgg/Gallery';
import Selects from '../my/Selects';
import Modal from '../my/Modal';
import Pagination from '../my/Pagination';
import { connect } from 'react-redux';
import { loadingStart, loadingEnd, setFiltes, userLogout, newError } from '../../store/ac';


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
        `https://tula-hackathon-2019-sakharov.cf/api/v1/images?sortBy=${sortBy}&limit=${limit}&page=${currentPage}&direction=${direction}&tag=${tag}`,
        {
          headers: this.props.token !== null
            ? {authorization: this.props.token}
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
        src: image.path,
        thumbnail: image.path,
        tags: image.tags,
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

  render() {
    return (
      <MDBRow>

        <Modal/>

        <MDBCol md="12">

          <MDBCard className="mt-5">

            <Selects/>

            <MDBCardBody
              className = "text-center"
              style={{ width: '100%'}}
            >
                <Pagination/>

                <Gallery
                  images={this.state.images}
                  enableImageSelection={false}
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