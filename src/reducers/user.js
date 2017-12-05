/*
 * author Pavel Nikitin
 * date 14.11.2017
 */

import { userActions } from "../constants";

const defaultState = {
    id: 0,
    name: 'Guest',
    isAuthenticated: 'n',
    authenticateResult: '',
    errorMessage: ''
};

export default function ( previousState = defaultState, action ) {
    switch (action.type) {
        case userActions.loadData:
            return action.payload;
        default:
            return previousState;
    }
}