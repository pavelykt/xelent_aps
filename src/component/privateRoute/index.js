/*
 * author Pavel Nikitin
 * date 14.11.2017
 */

import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Auth from '../auth';


const PrivateRoute = function ( { component: Component, user, ...rest } ) {
    return (
        <Route { ...rest } render={ props => {
            return user.isAuthenticated === 'y' ? (
                <Component { ...props }/>
            ) : (
                <Auth/>
            )
        } }/>
    );
};

export default withRouter( connect(
    state => ( {
        user: state.user
    } ),
    dispatch => ( {} )
)( PrivateRoute ) );