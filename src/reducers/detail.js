/*
 * author Pavel Nikitin
 * date 22.11.2017
 */

import {detailActions} from "../constants";

const defaultState = {};

export default function ( previousState = defaultState, action ) {
    switch (action.type) {
        case detailActions.resetDetail:
            return {};
        case detailActions.loadDetail:
            return action.payload;
        default:
            return previousState;
    }
}