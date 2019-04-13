import React from 'react'
import { MDBCol, MDBRow, MDBCard, MDBCardBody } from 'mdbreact';
import { Gallery } from '../rgg/Gallery';
import { Loader } from '../my/Loader';
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
    this.fetchImages();
  }

  onChangeHandler = (ev) => {
    this.props.dispatch(setFiltes({
      [ev.target.name]: ev.target.value,
    }));

    this.fetchImages();
  }

  fetchImages = async () => {
    this.props.dispatch(loadingStart());

    const data = await fetch(
        `https://tula-hackathon-2019-sakharov.cf/api/v1/images?sortBy=${this.props.filters.sortBy}&limit=${this.props.filters.limit}&page=${this.props.filters.currentPage}&direction=${this.props.filters.direction}`,
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

    // this.props.dispatch(pushImages({ images: data.images.map(image => ({
    //   src: image.path,
    //   thumbnail: image.path,
    //   tags: image.tags,
    //   caption: image.name,
    //   thumbnailWidth: 320,
    //   thumbnailHeight: 320,
    // }))}));
  };

  render() {
    return (
      <MDBRow>
        <MDBCol md="12">
          <select
            className="browser-default custom-select"
            onChange={this.onChangeHandler}
            name="sortBy"
            >
              <option value="id">Дата загрузки</option>
              <option value="name">Название</option>
              <option value="likes">Количество лайков</option>
          </select>
          <select
            className="browser-default custom-select"
            onChange={this.onChangeHandler}
            name="direction"
            >
              <option value="asc">По убыванию</option>
              <option value="desc">По возрастанию</option>
          </select>
          <select
            className="browser-default custom-select"
            onChange={this.onChangeHandler}
            defaultValue="20"
            name="limit"
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="80">80</option>
              <option value="100500">Все</option>
          </select>

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
                <Pagination/>

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
    filters: store.filters,
    images: store.images,
  }),
)(GalleryPage);