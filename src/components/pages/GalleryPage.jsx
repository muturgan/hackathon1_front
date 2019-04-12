import React from 'react'
import { MDBCol, MDBRow, MDBCard, MDBCardBody, MDBView } from 'mdbreact';
import { Gallery } from '../rgg/Gallery';


class GalleryPage extends React.Component {

  constructor() {
    super();

    this.state = {
      images: [],
    };
  }

  componentDidMount() {
    this.fetchImages();
  }

  async fetchImages() {
    const data = await fetch('https://tula-hackathon-2019-sakharov.cf/api/v1/images')
      .then((res) => res.json());

    this.setState({ images: data.images.map(image => ({
      src: image.path,
      thumbnail: image.path,
      tags: image.tags,
      caption: image.name,
      thumbnailWidth: 320,
      thumbnailHeight: 320,
    }))
   });
  };

  render() {
    return (
      <MDBRow>
        <MDBCol md="12">
          <MDBCard className="mt-5">
  
            <MDBView className="gradient-card-header blue darken-2">
              <h4 className="h4-responsive text-white">
                Regular map
              </h4>
            </MDBView >
  
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


export default GalleryPage;