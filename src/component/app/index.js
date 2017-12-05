/*
 * author Pavel Nikitin
 * date 14.11.2017
 */

import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import { connect } from 'react-redux';
import PrivateRoute from '../privateRoute';
import List from '../list';
import Auth from '../auth';
import Detail from '../detail';

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

class App extends React.Component {
    render() {
        return (
            <div>
                <Router basename="/aps/">
                    <Switch>
                        <PrivateRoute path="/" exact component={ List }/>
                        <PrivateRoute path="/detail/:id" component={ Detail }/>
                        <Route path="/login" component={ Auth }/>
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default connect(
    state => ( {} ),
    dispatch => ( {} )
)( App );