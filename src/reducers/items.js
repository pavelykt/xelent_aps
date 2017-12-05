/*
 * author Pavel Nikitin
 * date 18.11.2017
 */

import { itemsActions } from "../constants";

const defaultState = [];

export default function ( previousState = defaultState, action ) {
    switch (action.type) {
        case itemsActions.replaceItems:
            return action.payload;
        case itemsActions.checkItem:
            const nextState = previousState.slice(0);
            nextState[action.payload.index].checked = action.payload.value;
            return nextState;
        case itemsActions.loadItems:
            return action.payload;
        default:
            return previousState;
    }
}