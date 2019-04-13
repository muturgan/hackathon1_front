import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { userGetData } from '../store/ac';
import { MDBNavbar, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem } from 'mdbreact';
import ava_male from '../assets/default_user_male.png';
import ava_female from '../assets/default_user_female.webp';

class TopNavigation extends Component {
    that = this;
    state = {
        collapse: false,
    }

    onClick = () => {
        this.setState({
            collapse: !this.state.collapse,
        });
    }

    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    authListener = (e) => {
        e.source.close();
        alert(e);

        if (e.origin !== 'https://tula-hackathon-2019-sakharov.cf') {
            return;
        }
      
        alert( "получено: " + e.data );

        window.removeEventListener("message", this.authListener);
    }

    auth = () => {
        window.addEventListener("message", this.authListener);

        window.open("https://oauth.yandex.ru/authorize?response_type=token&client_id=2047cbd294a943cf80d51ae0227cb844&force_confirm=true&display=popup",
        "Авторизация",
        "width=500,height=500,menubar=no,toolbar=no,location=no,scrollbars=yes,status=no"
        );
    };

    fuck = () => {
        console.dir(this.state);
    }

    render() {
        return (
            <MDBNavbar className="flexible-navbar" light expand="md" scrolling>
                <MDBNavbarToggler onClick = { this.onClick } />
                <MDBCollapse isOpen = { this.state.collapse } navbar>
                    <MDBNavbarNav right>
                        <MDBNavItem>
                            <a
                                className="border border-light rounded mr-1 nav-link Ripple-parent"
                                rel="noopener noreferrer"
                                href="#"
                                onClick = { this.auth }
                                >
                                    Войдите через Яндекс
                            </a>
                        </MDBNavItem>
                        <MDBNavItem>
                            <a
                                className="border border-light rounded mr-1 nav-link Ripple-parent"
                                rel="noopener noreferrer"
                                href="#"
                                >
                                    {this.props.user.name}
                            </a>
                        </MDBNavItem>
                        <MDBNavItem>
                            <img
                                src={this.props.user.avatar || (this.props.user.sex === 'male' ? ava_male : ava_female)}
                                width="60" height="60"
                                alt="Аватарка"
                                className="rounded-circle z-depth-1-half"
                            />
                        </MDBNavItem>
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBNavbar>
        );
    }
}

// export default TopNavigation;
export default connect(
    store => ({user: store.user}),
    // () => {},
)(TopNavigation);