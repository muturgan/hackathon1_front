import React from 'react'
const { MDBCol, MDBRow, MDBCard, MDBCardBody } = require('mdbreact');



export default class InfoPage extends React.Component {


  render() {
    return (
      <MDBRow>
        <MDBCol md="12">
          <MDBCard>
            <MDBCardBody
              className = "text-center"
              style={{
                width: '100%',
                minHeight: `calc(${document.documentElement.clientHeight}px - 139px - 6rem)`,
                color: 'darkblue',
              }}
            >
              <ul style={{textAlign: 'left'}}>
                <li><a href="https://github.com/muturgan/hackathon1_back" target="_blank">
                  Ссылка на репозиторий с серверной частью приложения                
                </a></li>
                <li><a href="https://github.com/muturgan/hackathon1_front" target="_blank">
                  Ссылка на репозиторий с клиентской частью приложения                
                </a></li>
                <hr/>
                <li><a href="https://mdbootstrap.com/docs/react/" target="_blank">
                  Ссылка на документацию к использованной библиотеке графических компонентов
                </a></li>
                <li><a href="https://benhowell.github.io/react-grid-gallery/" target="_blank">
                  Ссылка на документацию к использованной библиотеке галереи (слегка модифицировал ее для реализации функционала лайков)
                </a></li>
                <hr/>
                <li><a href="https://pixabay.com/ru/" target="_blank">
                  Все картинки (хоть они сейчас и лежат на яндекске) былипозаимствованы с сайта pixabay
                </a></li>
                <hr/>
                <li><a href="https://oauth.yandex.ru/client/2047cbd294a943cf80d51ae0227cb844" target="_blank">
                  Ссылка на зарегистрированное яндекс приложение
                </a></li>
              </ul>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    );
  }
}