/*
 * author Pavel Nikitin
 * date 19.11.2017
 */

import { filterActions } from "../constants";

const defaultState = {
    pageIndex: 1,
    pageSize: 50,
    itemsCount: 0,
    orderField: 'createAt',
    orderDirection: 'desc',
    id: '',
    createAt: '',
    form_name: '',
    from_page_title: '',
    status: 0,
    email: '',
    responsible: 0
};

export default function ( previousState = defaultState, action ) {
    switch (action.type) {
        case filterActions.setFilter:
            const flt = action.payload;
            return {
                ...previousState,
                ...flt
            };
        case filterActions.setSort:
            return {
                ...previousState,
                orderField: action.payload.field,
                orderDirection: action.payload.direction
            };
        case filterActions.setItemsCount:
            return {
                ...previousState,
                itemsCount: action.payload
            };
        case filterActions.changePageSize:
            return {
                ...previousState,
                pageSize: action.payload
            };
        case filterActions.changePage:
            return {
                ...previousState,
                pageIndex: action.payload
            };
        default:
            return previousState;
    }
}