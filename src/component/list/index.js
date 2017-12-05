/*
 * author Pavel Nikitin
 * date 14.11.2017
 */

import React from 'react';
import { connect } from 'react-redux';
import Header from '../header';
import Table from './table';
import Pager from '../pager';
import Buttons from '../buttons';
import $ from 'jquery';
import './style.css';

class List extends React.Component {
    componentDidMount() {
        const headerHeight = $( 'header' ).outerHeight( true );
        const fixedHeight = $( '.fixed-header' ).outerHeight( true );
        if (fixedHeight > 0) {
            $( document ).on( 'scroll', function () {
                let curScroll = $( document ).scrollTop();
                if ( curScroll >= headerHeight ) {
                    $( '.fixed-header' ).addClass( 'is-fixed' );
                    $( 'header' ).css( { marginBottom: (fixedHeight + 25) + 'px' } )
                } else {
                    $( '.fixed-header' ).removeClass( 'is-fixed' );
                    $( 'header' ).css( { marginBottom: '0px' } );
                }
            } );
        }
    }

    render() {
        return (
            <div>
                <Header/>
                <div className="fixed-header">
                    <Pager/>
                    <Buttons/>
                </div>
                <Table/>
            </div>
        )
    }
}

export default connect(
    state => ( {} ),
    dispatch => ( {} )
)( List );