/*
 * author Pavel Nikitin
 * date 19.11.2017
 */

import React from 'react';
import { connect } from 'react-redux';
import { filterActions } from "../../constants";
import { loadItems } from '../../actions';
import $ from 'jquery';

import './style.css';

class Pager extends React.Component {
    constructor( props ) {
        super( props );
        this.getPagerItems = this.getPagerItems.bind( this );
    }

    getPagerItems() {
        const filter = this.props.filter;
        if ( filter.itemsCount > 0 ) {
            const itemsCount = Math.ceil( filter.itemsCount / filter.pageSize );
            const arItems = new Array( itemsCount );
            for ( let i = 0; i < itemsCount; i++ ) {
                arItems[ i ] = i + 1;
            }
            return arItems;
        } else {
            return [];
        }
    }

    onChangePage() {
        let filter = this.props.filter;
        const currPage = $( '.js-current-page' );
        filter.pageIndex = currPage.val();
        this.props.changePage( currPage.val(), { filter: filter } );
    }

    onChangePageSize() {
        let filter = this.props.filter;
        const currSize = $( '.counting' );
        filter.pageSize = currSize.val();
        const itemsCount = Math.ceil( filter.itemsCount / filter.pageSize );
        if (itemsCount < filter.pageIndex) {
            this.props.changePageIndex(itemsCount);
            filter.pageIndex = itemsCount;
        }
        this.props.changePageSize( currSize.val(), { filter: filter } );
    }

    render() {
        const items = this.getPagerItems();
        return (
            <section className="pageble">
                <div className="container">
                    <div className="row">
                        <div className="col-2">
                            <div className="pagen">
                                <span>Страница:</span>
                                <select className="js-current-page" value={ this.props.filter.pageIndex }
                                        onChange={ this.onChangePage.bind( this ) }>
                                    {
                                        items.map( ( item, index ) => {
                                            return (
                                                <option key={ index } value={ item }>{ item }</option>
                                            )
                                        } )
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="d-flex justify-content-between">
                                <span>по</span>
                                <select className="counting" value={ this.props.filter.pageSize }
                                        onChange={ this.onChangePageSize.bind( this ) }>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                    <option value="75">75</option>
                                    <option value="100">100</option>
                                </select>
                                <span>записей на странице</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default connect(
    state => ( {
        filter: state.filter
    } ),
    dispatch => ( {
        changePage: ( page, filter ) => {
            dispatch( { type: filterActions.changePage, payload: page } );
            dispatch( loadItems( filter ) );
        },
        changePageIndex(page) {
            dispatch( { type: filterActions.changePage, payload: page } );
        },
        changePageSize: ( size, filter ) => {
            dispatch( { type: filterActions.changePageSize, payload: size } );
            dispatch( loadItems( filter ) );
        }
    } )
)( Pager );