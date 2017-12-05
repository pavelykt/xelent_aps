/*
 * author Pavel Nikitin
 * date 14.11.2017
 */

import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { authenticateUser } from "../../actions";
import Loading from '../loading';
import $ from 'jquery';
import './style.css';

class Auth extends React.Component {
    onSubmit(event) {
        event.preventDefault();
        let form = $(this.refs.authForm);
        let formData = form.serializeArray();
        this.props.authenticate(formData);
    }
    render() {
        if (this.props.isLoading) {
            return (
                <Loading text='Загрузка...'/>
            )
        }
        if ( this.props.user.isAuthenticated === 'y' ) {
            return (
                <Redirect to={ {
                    pathname: "/"
                } }/>
            )
        }
        const errorMessage = this.props.user.authenticateResult === 'error' ?
            <div className="alert alert-danger">{this.props.user.errorMessage}</div> : ``;
        return (
            <section className="authenticate">
                <div className="col-4">
                    <div className="authenticate__logo">
                        <img src={ `${process.env.PUBLIC_URL}/images/xelent.svg` } alt="Xelent APS"/>
                    </div>
                    {errorMessage}
                    <div className="authenticate__form">
                        <form onSubmit={ this.onSubmit.bind(this) } method="post" ref="authForm">
                            <div className="form-group">
                                <label htmlFor="username">Имя пользователя или е-mail</label>
                                <Field name="username" component="input" type="text" className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Пароль</label>
                                <Field name="password" component="input" type="password" className="form-control"/>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="form-group">
                                    <label className="form-check-label">
                                        <Field
                                            name="remember"
                                            id="remember"
                                            type="checkbox"
                                            component="input"
                                            className="form-check-input"
                                        />
                                        Запомнить меня на этом компьютере
                                    </label>
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-primary">Войти</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        );
    }
}

const connectedAuth = connect(
    state => ( {
        user: state.user,
        isLoading: state.main.isLoading
    } ),
    dispatch => ( {
        authenticate: (data) => {
            dispatch(authenticateUser(data));
        }
    } )
)( Auth );

export default reduxForm( {
    form: 'authenticate'
} )( connectedAuth );