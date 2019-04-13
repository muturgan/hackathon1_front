import React from 'react'
import { MDBCol, MDBRow, MDBCard, MDBCardBody, MDBView } from 'mdbreact';
import { Gallery } from '../rgg/Gallery';
import { Select } from '../my/Select';
import { connect } from 'react-redux';


class GalleryPage extends React.Component {

  constructor() {
    super();

    this.state = {
      images: [],
      sortBy: 'id',
      direction: 'asc',
      limit: 20,
      offset: 0,
      loading: false,
    };
  }

  componentDidMount() {
    this.fetchImages();
  }

  async fetchImages() {
    this.state.loading = true;

    const data = await fetch(
        `https://tula-hackathon-2019-sakharov.cf/api/v1/images?sortBy=${this.state.sortBy}&limit=${this.state.limit}&offset=${this.state.offset}&direction=${this.state.direction}`,
        {
          headers: this.props.token !== null
            ? {authorization: this.props.token}
            : {},
        }
      ).then((res) => res.json());

    this.setState({ images: data.images.map(image => ({
      src: image.path,
      thumbnail: image.path,
      tags: image.tags,
      caption: image.name,
      thumbnailWidth: 320,
      thumbnailHeight: 320,
    }))});

    this.state.loading = false;
  };

  render() {
    return (
      <MDBRow>
        <MDBCol md="12">
          <Select />

          <MDBCard className="mt-5">

            <MDBCardBody
              className = "text-center"
              style={{ width: '100%'}}
            >
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
  store => ({token: store.user.token}),
)(GalleryPage);