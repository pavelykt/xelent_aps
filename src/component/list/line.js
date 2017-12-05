/*
 * author Pavel Nikitin
 * date 19.11.2017
 */

import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { itemsActions, mainActions } from "../../constants";
import $ from 'jquery';

class Line extends React.Component {
    onRowClick() {
        this.props.history.push( `/detail/${this.props.item.id}` );
    }

    onChangeItem() {
        const check = $( this.refs.check );
        if ( check.is( ':checked' ) ) {
            this.props.checkItem( { index: this.props.index, value: 'y' } );
            this.props.hasChecked( true );
        } else {
            const items = this.props.items.slice( 0 );
            let hasChecked = false;
            items[ this.props.index ].checked = 'n';
            items.map( item => {
                if ( item.checked === 'y' )
                    hasChecked = true;
                return true;
            } );
            this.props.checkItem( { index: this.props.index, value: 'n' } );
            if ( !hasChecked ) {
                this.props.hasChecked( false );
            }
        }
    }

    render() {
        const currUser =  this.props.usersList.find( el => {
            return el.id === this.props.item.responsible;
        } );
        return (
            <div className="table__row">
                {
                    ( this.props.user.isAdmin === 'y' ) ?
                        <div className="table__cell table__cell--check">
                            <input type="checkbox" checked={ this.props.items[this.props.index].checked === 'y' } ref="check"
                                   onChange={ this.onChangeItem.bind( this ) }/>
                        </div> : <div className="table__cell table__cell--check">&nbsp;</div>
                }
                <div className='table__row-inner' onClick={ this.onRowClick.bind( this ) }>
                    <div className="table__cell table__cell--id">{ this.props.item.id }</div>
                    <div className="table__cell">{ this.props.item.createAt }</div>
                    <div className="table__cell">{ this.props.item.form_name }</div>
                    <div className="table__cell">{ this.props.item.from_page_title }</div>
                    <div className="table__cell">{ this.props.statuses.find( el => {
                        return el.id === this.props.item.status;
                    } ).text }</div>
                    <div className="table__cell">{ this.props.item.email }</div>
                    <div className="table__cell">
                        {
                            ( currUser ) ?
                                currUser.text : ''
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter( connect(
    state => ( {
        items: state.items
    } ),
    dispatch => ( {
        checkItem: ( check ) => {
            dispatch( { type: itemsActions.checkItem, payload: check } )
        },
        hasChecked: ( check ) => {
            dispatch( { type: mainActions.hasChecked, payload: check } )
        }
    } )
)( Line ) );