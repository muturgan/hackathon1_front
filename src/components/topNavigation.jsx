import React, { Component } from 'react';
import { connect } from 'react-redux';
import { USER_UPDATE_DATA } from '../store/constants';
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

    login = async (yatoken) => {
        const data = await fetch(
            `https://tula-hackathon-2019-sakharov.cf/api/v1/login`,
            {
                method: 'POST',
                headers: {['Content-Type']: 'application/json'},
                body: JSON.stringify({yatoken}),
            },
        ).then((res) => res.json());

        this.props.dispatch({
            type: USER_UPDATE_DATA, 
            payload: {
            name: data.userData.real_name,
            sex: data.userData.sex,
            email: data.userData.default_email,
            token: data.jwtToken,
            avatar: data.userData.is_avatar_empty ? null : `https://avatars.yandex.net/get-yapic/${data.userData.default_avatar_id}/islands-200`,
            }
        });
    }

    authListener = async (e) => {
        e.source.close();

        if (e.origin !== 'https://tula-hackathon-2019-sakharov.cf') {
            return;
        }

        window.removeEventListener("message", this.authListener);

        await this.login(e.data.token);
    }

    auth = () => {
        window.addEventListener("message", this.authListener);

        window.open("https://oauth.yandex.ru/authorize?response_type=token&client_id=2047cbd294a943cf80d51ae0227cb844&force_confirm=true&display=popup",
        "Авторизация",
        "width=500,height=500,menubar=no,toolbar=no,location=no,scrollbars=yes,status=no"
        );
    };

    render() {
        return (
            <MDBNavbar className="flexible-navbar" light expand="md" scrolling>
                <MDBNavbarToggler onClick = { this.onClick } />
                <MDBCollapse isOpen = { this.state.collapse } navbar>
                    <MDBNavbarNav right>
                        {
                        !this.props.user.token
                            ? <MDBNavItem>
                                <a
                                    className="border border-light rounded mr-1 nav-link Ripple-parent"
                                    rel="noopener noreferrer"
                                    onClick = { this.auth }
                                    >
                                        Войдите через Яндекс
                                </a>
                            </MDBNavItem>
                            : ''
                        }
                        <MDBNavItem>
                            <span
                                className="border border-light rounded mr-1 nav-link Ripple-parent"
                                rel="noopener noreferrer"
                                style={{['user-select']: 'none'}}
                                >
                                    {this.props.user.name}
                            </span>
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