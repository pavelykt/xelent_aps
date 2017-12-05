/*
 * author Pavel Nikitin
 * date 15.11.2017
 */

import $ from 'jquery';
import {
    LINK_USER_DATA,
    LINK_AUTHENTICATE,
    LINK_LOGOUT,
    LINK_LOAD_ITEMS,
    LINK_LOAD_STATUSES,
    LINK_LOAD_USERS_LIST,
    LINK_LOAD_DETAIL,
    LINK_GET_PRODUCTS,
    userActions,
    itemsActions,
    statusesActions,
    filterActions,
    mainActions,
    detailActions,
    productsActions } from "../constants";

export const loadUserData = () => dispatch => {
    dispatch({type: mainActions.setIsLoading, payload: true});
    $.get( LINK_USER_DATA, { ajax: 'y' }, function ( response ) {
        dispatch( { type: userActions.loadData, payload: response } );
        dispatch({type: mainActions.setIsLoading, payload: false});
    }, 'json' )
};

export const authenticateUser = (data) => dispatch => {
    $.post( LINK_AUTHENTICATE, data, function ( response ) {
        dispatch( { type: userActions.loadData, payload: response } );
    }, 'json' )
};

export const logout = () => dispatch => {
    $.get( LINK_LOGOUT, { ajax: 'y' }, function ( response ) {
        dispatch( { type: userActions.loadData, payload: response } );
    }, 'json' )
};

export const loadItems = (filter) => dispatch => {
    dispatch({type: mainActions.setIsLoading, payload: true});
    $.get( LINK_LOAD_ITEMS, filter, function ( response ) {
        dispatch( { type: itemsActions.loadItems, payload: response.items } );
        dispatch( { type: filterActions.setItemsCount, payload: response.count } );
        dispatch({type: mainActions.setIsLoading, payload: false});
    }, 'json' )
};

export const loadStatuses = () => dispatch => {
    $.get( LINK_LOAD_STATUSES, {}, function ( response ) {
        dispatch( { type: statusesActions.loadStatuses, payload: response.items } );
    }, 'json' )
};

export const loadUsersList = () => dispatch => {
    $.get( LINK_LOAD_USERS_LIST, {}, function ( response ) {
        dispatch( { type: userActions.loadUsersList, payload: response.items } );
    }, 'json' )
};

export const loadDetailItem = (id) => dispatch => {
    dispatch({type: mainActions.setIsLoading, payload: true});
    $.get( LINK_LOAD_DETAIL, {id: id}, function ( response ) {
        dispatch( { type: detailActions.loadDetail, payload: response } );
        dispatch({type: mainActions.setIsLoading, payload: false});
    }, 'json' )
};

export const loadProductsList = () => dispatch => {
    $.get( LINK_GET_PRODUCTS, {}, function ( response ) {
        dispatch( { type: productsActions.loadProducts, payload: response } );
    }, 'json' )
};

export const hasChecked = (checked) => {
    return {
        type: mainActions.hasChecked,
        payload: checked,
    }
};