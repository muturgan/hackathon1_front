import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userLogin, userLogout, newError } from '../store/actions';
import ava_male from '../assets/default_user_male.png';
import ava_female from '../assets/default_user_female.webp';
import { BASE_URL } from '../store/base_url';
import { storeType } from '../store/store';
import { userType } from '../custom_types';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
const { MDBNavbar, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem } = require('mdbreact');

type TopNavigationProps = {
    user: userType;
    dispatch: ThunkDispatch<storeType, {}, AnyAction>;
};

type TopNavigationState = {
    dropdownOpen: boolean;
    collapse: boolean;
}


class TopNavigation extends Component<TopNavigationProps, TopNavigationState> {

    constructor (props: TopNavigationProps) {
        super(props);

        this.state = {
            collapse: false,
            dropdownOpen: false,
        };
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

    login = async (yatoken: string) => {
        const data = await fetch(
            `${BASE_URL}/login`,
            {
                method: 'POST',
                headers: {['Content-Type']: 'application/json'},
                body: JSON.stringify({yatoken}),
            },
        ).then(res => res.json());

        if (data.success = false) {
            this.props.dispatch(newError({code: data.code, message: data.message}));

        } else {
            this.props.dispatch(userLogin(data));
        }
    }

    authListener = async (ev: MessageEvent) => {
        if (ev.source && 'close' in ev.source) {
            ev.source.close();
        }

        if (ev.origin !== 'https://tula-hackathon-2019-sakharov.cf') {
            return;
        }

        window.removeEventListener("message", this.authListener);

        if (ev.data.error !== null) {
            this.props.dispatch(newError({
                code: ev.data.error.code,
                message: ev.data.error.message,
            }));

        } else {
            this.login(ev.data.token);
        }
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
                            ? <MDBNavItem className="mt-2">
                                <a
                                    className="border border-light rounded mr-1 nav-link Ripple-parent"
                                    rel="noopener noreferrer"
                                    onClick = { this.auth }
                                    >
                                        Войдите через Яндекс
                                </a>
                            </MDBNavItem>
                            : <MDBNavItem className="mt-2">
                                <a
                                    className="border border-light rounded mr-1 nav-link Ripple-parent"
                                    rel="noopener noreferrer"
                                    onClick = { () => this.props.dispatch(userLogout()) }
                                    >
                                        Выйти из профиля
                                </a>
                            </MDBNavItem>
                        }
                        <MDBNavItem className="ml-1 mt-2">
                            <span
                                className="border border-light rounded mr-1 nav-link Ripple-parent"
                                style={{userSelect: 'none'}}
                                >
                                    {this.props.user.name}
                            </span>
                        </MDBNavItem>
                        <MDBNavItem className="ml-3">
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


export default connect(
    (store: storeType) => ({user: store.user}),
)(TopNavigation);