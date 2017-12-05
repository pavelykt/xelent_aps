/*
 * author Pavel Nikitin
 * date 18.11.2017
 */

import { statusesActions } from "../constants";

const defaultState = [];

export default function ( previousState = defaultState, action ) {
    switch (action.type) {
        case statusesActions.loadStatuses:
            return action.payload;
        default:
            return previousState;
    }
}