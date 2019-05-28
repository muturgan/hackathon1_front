import React from 'react';
const { MDBFooter } = require('mdbreact');

const Footer = () => {
    return (
        <MDBFooter color="blue" className="text-center font-small darken-2">
            <p className="footer-copyright mb-0 py-3 text-center">
            Квалификационная работа Андрея Сахарова в рамках первого этапа регионального конкурса профессионального мастерства «Лучший разработчик WEB и мультимедийных приложений»
            </p>
        </MDBFooter>
    );
}

export default Footer;