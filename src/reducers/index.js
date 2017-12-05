/*
 * author Pavel Nikitin
 * date 14.11.2017
 */

import { combineReducers } from 'redux';
import user from './user';
import items from './items';
import statuses from './statuses';
import usersList from './usersList';
import filter from './filter';
import main from './main';
import detail from './detail';
import products from './products';
import { reducer as formReducer } from 'redux-form';

export default combineReducers( {
    form: formReducer,
    user,
    usersList,
    statuses,
    items,
    detail,
    filter,
    main,
    products
} )