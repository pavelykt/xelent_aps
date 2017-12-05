/*
 * author Pavel Nikitin
 * date 17.11.2017
 */

import React from 'react';
import { connect } from 'react-redux';
import { loadItems, loadStatuses, loadUsersList } from "../../actions";
import Line from './line';
import { itemsActions, mainActions, detailActions } from "../../constants";
import Loading from '../loading';
import $ from 'jquery';

class Table extends React.Component {
    componentWillMount() {
        this.props.getStatuses();
        this.props.getUsersList();
        this.props.getItems( { filter: this.props.filter } );
        this.props.resetDetail();
    }

    onChangeAllCheck( e ) {
        const items = this.props.items.slice( 0 );
        for ( let k in items ) {
            if ( $( e.target ).is( ':checked' ) ) {
                items[ k ].checked = 'y';
                this.props.hasChecked( true );
            } else {
                items[ k ].checked = 'n';
                this.props.hasChecked( false );
            }
        }
        this.props.replaceItems( items );

    }

    render() {
        if (this.props.isLoading) {
            return (
                <Loading text="Загрузка..." />
            )
        }
        if ( (this.props.statuses.length > 0 && this.props.usersList.length > 0)) {
            const emptyMessage = ( this.props.items.length < 1 ) ?
                <div className="table__empty">Заявок не обнаружено.</div> : ``;

            return (
                <section className="section">
                    <div className="container">
                        <div className="table">
                            <div className="table__header">
                                <div className="table__row">
                                    {
                                        this.props.user.isAdmin === 'y' ?
                                            <div className="table__cell table__cell--header table__cell--check">
                                                <input type="checkbox" onChange={ this.onChangeAllCheck.bind( this ) }/>
                                            </div> : <div
                                                className="table__cell table__cell--header table__cell--check">&nbsp;</div>
                                    }
                                    <div className="table__cell table__cell--header table__cell--id">ID</div>
                                    <div className="table__cell table__cell--header">Дата создания</div>
                                    <div className="table__cell table__cell--header">Форма</div>
                                    <div className="table__cell table__cell--header">Страница</div>
                                    <div className="table__cell table__cell--header">Статус</div>
                                    <div className="table__cell table__cell--header">E-mail</div>
                                    <div className="table__cell table__cell--header">Менеджер</div>
                                </div>
                            </div>
                            <div className="table__body">
                                { emptyMessage }
                                {
                                    this.props.items.map( ( item, index ) => {
                                        return (
                                            <Line
                                                key={ item.id }
                                                index={ index }
                                                item={ item }
                                                user={ this.props.user }
                                                statuses={ this.props.statuses }
                                                usersList={ this.props.usersList }
                                            />
                                        )
                                    } )
                                }
                            </div>
                        </div>
                    </div>
                </section>
            );
        } else {
            return (
                <Loading text="Загрузка..." />
            )
        }
    }
}

export default connect(
    state => ( {
        user: state.user,
        items: state.items,
        statuses: state.statuses,
        usersList: state.usersList,
        filter: state.filter,
        isLoading: state.main.isLoading
    } ),
    dispatch => ( {
        getItems: ( filter ) => {
            dispatch( loadItems( filter ) );
        },
        getStatuses: () => {
            dispatch( loadStatuses() );
        },
        getUsersList: () => {
            dispatch( loadUsersList() );
        },
        replaceItems: ( items ) => {
            dispatch( { type: itemsActions.replaceItems, payload: items } );
        },
        hasChecked: ( check ) => {
            dispatch( { type: mainActions.hasChecked, payload: check } )
        },
        resetDetail: () => {
            dispatch({type: detailActions.resetDetail});
        }
    } )
)( Table );