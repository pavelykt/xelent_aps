/*
 * author Pavel Nikitin
 * date 19.11.2017
 */

import { userActions } from "../constants";

const defaultState = [];

export default function ( previousState = defaultState, action ) {
    switch (action.type) {
        case userActions.loadUsersList:
            return action.payload;
        default:
            return previousState;
    }
}