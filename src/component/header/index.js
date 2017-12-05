/*
 * author Pavel Nikitin
 * date 14.11.2017
 */

import React from 'react';
import { connect } from 'react-redux';
import { logout } from "../../actions";
import './style.css';

const Header = ( props ) => {
    const logout = () => {
        props.logout();
    };
    return (
        <header>
            <div className="container">
                <div className="row justify-content-between align-items-center">
                    <div className="col-3">
                        <div className="logo">
                            <img src={ `${process.env.PUBLIC_URL}/images/xelent.svg` } alt="Xelent APS"/>
                        </div>
                    </div>
                    <div className="col-3">
                        <p>Здравствуйте, { props.user.name } [<span className="link" onClick={ logout }>выход</span>]
                        </p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default connect(
    state => ( {
        user: state.user
    } ),
    dispatch => ( {
        logout: () => {
            dispatch(logout());
        }
    } )
)( Header );