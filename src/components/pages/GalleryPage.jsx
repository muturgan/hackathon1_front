import React from 'react'
import { MDBCol, MDBRow, MDBCard, MDBCardBody } from 'mdbreact';
import { Gallery } from '../rgg/Gallery';
import { Loader } from '../my/Loader';
import Selects from '../my/Selects';
import Pagination from '../my/Pagination';
import { connect } from 'react-redux';
import { loadingStart, loadingEnd, setFiltes } from '../../store/ac';


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
    if (
      nextProps.filters.sortBy !== this.props.filters.sortBy
      || nextProps.filters.limit !== this.props.filters.limit
      || nextProps.filters.currentPage !== this.props.filters.currentPage
      || nextProps.filters.direction !== this.props.filters.direction
    ) {this.fetchImages(nextProps)}
    return true;
  }

  fetchImages = async (props) => {
    this.props.dispatch(loadingStart());

    const data = await fetch(
        `https://tula-hackathon-2019-sakharov.cf/api/v1/images?sortBy=${props.filters.sortBy}&limit=${props.filters.limit}&page=${props.filters.currentPage}&direction=${props.filters.direction}`,
        {
          headers: this.props.token !== null
            ? {authorization: this.props.token}
            : {},
        }
      ).then((res) => res.json());

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

    this.props.dispatch(setFiltes({
      pages: data.pages,
    }));

    this.props.dispatch(loadingEnd());
  };

  render() {
    return (
      <MDBRow>
        <MDBCol md="12">

          <MDBCard className="mt-5">

            <Selects/>
            <Loader/>

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