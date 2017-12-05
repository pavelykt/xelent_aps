/*
 * author Pavel Nikitin
 * date 21.11.2017
 */

import { mainActions } from "../constants";

const defaultState = {
    hasChecked: false,
    isLoading: false
};

export default function ( previousState = defaultState, action ) {
    switch (action.type) {
        case mainActions.setIsLoading:
            return {
                ...previousState,
                isLoading: action.payload
            };
        case mainActions.hasChecked:
            return {
                ...previousState,
                hasChecked: action.payload
            };
        default:
            return previousState;
    }
}