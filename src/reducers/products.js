/*
 * author Pavel Nikitin
 * date 18.11.2017
 */

import { productsActions } from "../constants";

const defaultState = [];

export default function ( previousState = defaultState, action ) {
    switch (action.type) {
        case productsActions.loadProducts:
            return action.payload;
        default:
            return previousState;
    }
}