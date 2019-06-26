import React from 'react';
import './InfoPage.css';
const { MDBCol, MDBRow, MDBCard, MDBCardBody } = require('mdbreact');



export default class InfoPage extends React.Component {


  render() {
    return (
      <MDBRow>
        <MDBCol md="12">
          <MDBCard>
            <MDBCardBody className="task">

              <ul>
                <li><a href="https://github.com/muturgan/hackathon1_back" target="_blank">
                  Ссылка на репозиторий с серверной частью приложения                
                </a></li>
                <li><a href="https://github.com/muturgan/hackathon1_front" target="_blank">
                  Ссылка на репозиторий с клиентской частью приложения                
                </a></li>
              </ul>

              <hr/>

              <h4> Задание</h4>

              <p>
                Необходимо реализовать Веб-приложение фотогалереи.
              </p>

              <p>
                Приложение будет оцениваться по совокупности реализации следующих
                компонентов <span className="notready">(Выделенные серым цветом пункты не реализованы)</span>:
              </p>

              <ol>
                <li>
                  Авторизация пользователя в приложении.
                  <p>
                    Возможен один из двух вариантов выполнения:
                  </p>
                  <ul>
                    <li>
                      При помощи сервиса Яндекс <a href="https://yandex.ru/promo/login" target="_blank">https://yandex.ru/promo/login</a>;
                    </li>
                    <li className="notready">
                      Локальная регистрация и авторизация пользователей.
                    </li>
                  </ul>
                </li>

                <li style={{marginTop: '16px'}}>
                  Размещение изображений в приложении.
                  <p>
                    На главной странице приложения необходимо разместить галерею изображений в виде плитки. При клике на изображение должно открываться модальное окно с возможностью пролистать галерею вперед или назад. Общее количество отображаемых изображений должно быть не менее 80.
                  </p>
                  <p>
                    Возможен один из двух вариантов выполнения:
                  </p>
                  <ul>
                    <li>
                      Через API Яндекс.Диска <a href="https://tech.yandex.ru/disk/api/concepts/quickstart-docpage/" target="_blank">https://tech.yandex.ru/disk/api/concepts/quickstart-docpage/</a>.
                      <p style={{margin: '0'}}>
                        Изображения должны загружаться с зарегистрированного приложения в сервисе Яндекс.
                      </p>
                    </li>
                    <li className="notready">
                      Локальная база изображений.
                    </li>
                  </ul>
                </li>

                <li style={{marginTop: '16px'}}>
                  <span className="notready">
                    Добавление тегов к изображениям авторизованными пользователями.
                  </span>
                  <p style={{margin: '0'}}>
                    Теги должны храниться в локальной базе данных.
                  </p>
                </li>

                <li>
                  Фильтрация изображений по тегам.
                </li>

                <li>
                  Оценка изображений авторизованными пользователями.
                  <p style={{margin: '0'}}>
                    Оценки должны храниться в локальной базе данных приложения.
                  </p>
                </li>

                <li>
                  Сортировка изображений по названию и рейтингу в порядке возрастания и убывания.
                </li>

                <li>
                  Постраничная навигация списка изображений (10, 20, 50, все изображения на странице).
                </li>

                <li>
                  AJAX загрузка страниц навигации.
                </li>
              </ol>
              
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    );
  }
}