import React from 'react';
import logo from "../assets/logo404.jpg";
import { NavLink } from 'react-router-dom';
const { MDBListGroup, MDBListGroupItem, MDBIcon } = require('mdbreact');

const TopNavigation = () => {
    return (
        <div className="sidebar-fixed position-fixed">
            <a href="https://dev2019.ru/" className="logo-wrapper waves-effect">
                <img alt="Логотип конкурса" className="img-fluid" src={logo}/>
            </a>
            <MDBListGroup className="list-group-flush">
                <NavLink exact={true} to="/" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="map" className="mr-3"/>
                        Галерея
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/info" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="info" className="mr-3"/>
                        Информация
                    </MDBListGroupItem>
                </NavLink>
            </MDBListGroup>
        </div>
    );
}

export default TopNavigation;