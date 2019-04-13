import React from 'react'
import { MDBCol, MDBRow, MDBCard, MDBCardBody } from 'mdbreact';
import { Gallery } from '../rgg/Gallery';
import { Loader } from '../my/Loader';
import { Select } from '../my/Select';
import { connect } from 'react-redux';
import { loadingStart, loadingEnd } from '../../store/ac';


class GalleryPage extends React.Component {

  constructor() {
    super();

    this.state = {
      images: [],
      sortBy: 'id',
      direction: 'asc',
      limit: 20,
      offset: 0,
    };
  }

  componentDidMount() {
    this.fetchImages();
  }

  async fetchImages() {
    this.props.dispatch(loadingStart());

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

    this.props.dispatch(loadingEnd());
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
              <div
                style={{
                  margin: 0,
                  padding: 0,
                  width: '100%',
                  height: '100%',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                { this.props.isLoading
                    ? <div
                        style={{
                          margin: 0,
                          padding: 0,
                          top: 0,
                          bottom: 0,
                          left: 0,
                          right: 0,
                          position: 'absolute',
                          zIndex: 2,
                        }}
                      >
                        <div
                          style={{
                            margin: 0,
                            padding: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(0,0,0,0.8)',
                            zIndex: 3,
                          }}
                        >
                        </div>
                        <div
                          style={{
                            margin: 0,
                            padding: 0,
                            width: '100%',
                            height: '100%',
                            zIndex: 4,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <Loader/>
                        </div>
                      </div>
                    : ''
                }

                <Gallery
                  images={this.state.images}
                  enableImageSelection={false}
                />
              </div>

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
  }),
)(GalleryPage);