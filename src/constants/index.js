/*
 * author Pavel Nikitin
 * date 14.11.2017
 */

/** LINK CONSTANTS */

// export const LINK_HOST = 'http://192.168.99.100';
export const LINK_HOST = '';

export const LINK_USER_DATA = `${LINK_HOST}/aps/?action=getUser`;
export const LINK_AUTHENTICATE = `${LINK_HOST}/aps/?action=authenticate&ajax=y`;
export const LINK_LOGOUT = `${LINK_HOST}/aps/?action=logout`;

export const LINK_LOAD_ITEMS = `${LINK_HOST}/aps/?action=getItems&ajax=y`;

export const LINK_LOAD_STATUSES = `${LINK_HOST}/aps/?action=getStatuses&ajax=y`;
export const LINK_LOAD_USERS_LIST = `${LINK_HOST}/aps/?action=getUsersList&ajax=y`;

export const LINK_LOAD_DETAIL = `${LINK_HOST}/aps/?action=getItem&ajax=y`;

export const LINK_GET_PRODUCTS = `${LINK_HOST}/aps/?action=getProducts&ajax=y`;

export const LINK_UPDATE_ITEM = `${LINK_HOST}/aps/?action=update&ajax=y`;
export const LINK_ADD_ITEM = `${LINK_HOST}/aps/?action=add&ajax=y`;
export const LINK_DELETE_ITEMS = `${LINK_HOST}/aps/?action=delete&ajax=y`;

export const LINK_GET_EXCEL = `${LINK_HOST}/aps/?action=getExcel`;

/** END LINK CONSTANTS */

/** ACTIONS */

export const userActions = {
    loadData: 'LOAD_USER_DATA',
    loadUsersList: 'LOAD_USERS_LIST'
};

export const itemsActions = {
    loadItems: 'LOAD_ITEMS',
    checkItem: 'CHECK_ITEM',
    replaceItems: 'REPLACE_ITEMS'
};

export const statusesActions = {
    loadStatuses: 'LOAD_STATUSES'
};

export const filterActions = {
    setItemsCount: 'SET_ITEMS_COUNT',
    changePage: 'CHANGE_PAGE',
    changePageSize: 'CHANGE_PAGE_SIZE',
    setSort: 'FILTER_SET_SORT',
    setFilter: 'FILTER_SET_FILTER'
};

export const mainActions = {
    hasChecked: "MAIN_HAS_CHECKED",
    setIsLoading: 'SET_IS_LOADING',
};

export const detailActions = {
    loadDetail: "LOAD_DETAIL",
    resetDetail: "RESET_DETAIL"
};

export const productsActions = {
    loadProducts: 'LOAD_PRODUCTS'
};

/** END ACTIONS */