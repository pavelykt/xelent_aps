/*
 * author Pavel Nikitin
 * date 21.11.2017
 */

import React from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import 'air-datepicker/dist/css/datepicker.min.css';
import './style.css';
import { filterActions, LINK_DELETE_ITEMS, mainActions, LINK_GET_EXCEL } from "../../constants";
import { loadItems } from "../../actions";
import { Link } from 'react-router-dom';

window.jQuery = window.$ = $;
require( 'air-datepicker' );

class Buttons extends React.Component {
    openPopup( e ) {
        const btn = $( e.target );
        const wrap = btn.parent( '.popup-wrap' );
        let add = true;
        if ( wrap.hasClass( 'is-active' ) )
            add = false;
        $( '.popup-wrap' ).removeClass( 'is-active' );
        if ( add )
            wrap.addClass( 'is-active' );
        else
            wrap.removeClass( 'is-active' );
    }

    componentDidMount() {
        $( '.js-datepicker' ).datepicker( {
            range: true,
            multipleDatesSeparator: '-'
        } );
    }

    onApplySort( e ) {
        e.preventDefault();
        const form = $( e.target );
        const data = form.serializeArray();
        let payload = {
            field: data.find( el => {
                return el.name === 'field'
            } ).value,
            direction: data.find( el => {
                return el.name === 'direction'
            } ).value
        };
        this.props.setSort( payload );
        const filter = {
            ...this.props.filter,
            orderField: payload.field,
            orderDirection: payload.direction
        };
        this.props.getItems( { filter: filter } );
        $( '.popup-wrap' ).removeClass( 'is-active' );
    }

    onApplyFilter( e ) {
        e.preventDefault();
        const form = $( e.target );
        const data = form.serializeArray();
        let payload = {
            id: data.find( el => {
                return el.name === 'id'
            } ).value,
            createAt: data.find( el => {
                return el.name === 'createAt'
            } ).value,
            form_name: data.find( el => {
                return el.name === 'form_name'
            } ).value,
            from_page_title: data.find( el => {
                return el.name === 'from_page_title'
            } ).value,
            status: data.find( el => {
                return el.name === 'status'
            } ).value,
            email: data.find( el => {
                return el.name === 'email'
            } ).value,
            responsible: data.find( el => {
                return el.name === 'responsible'
            } ).value,
        };
        this.props.setFilter( payload );
        const flt = {
            ...this.props.filter,
            ...payload
        };
        this.props.getItems( { filter: flt } );
        $( '.popup-wrap' ).removeClass( 'is-active' );
    }

    clearFilter( e ) {
        let payload = {
            id: '',
            createAt: '',
            form_name: '',
            from_page_title: '',
            status: 0,
            email: '',
            responsible: 0,
        };
        this.props.setFilter( payload );
        const flt = {
            ...this.props.filter,
            ...payload
        };
        this.props.getItems( { filter: flt } );
        $( '.popup-wrap' ).removeClass( 'is-active' );
        $( e.target ).closest( 'form' )[ 0 ].reset();
    }

    onDeleteClick() {
        this.props.setIsLoading( true );
        const deleteItems = [];
        for ( let k in this.props.items ) {
            const item = this.props.items[ k ];
            if ( item.checked === 'y' )
                deleteItems.push( item.id );
        }
        $.ajax( {
            url: LINK_DELETE_ITEMS,
            type: 'get',
            data: {
                id: deleteItems
            },
            success: ( response ) => {
                this.props.getItems( { filter: this.props.filter } );
                this.props.setHasChecked( false );
            }
        } )

    }

    onExportClick() {
        const ifr = document.createElement('iframe');
        $('body').append(ifr);
        $(ifr).css({display: 'none'});
        const settings = {
            settings: this.props.filter
        };
        ifr.src = LINK_GET_EXCEL + '&' + $.param(settings);
        setTimeout(() => {
            $(ifr).remove();
        }, 60000);
    }

    render() {
        return (
            <section className="buttons">
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-5 d-flex">
                            {
                                ( this.props.user.isAdmin === 'y' ) ?
                                    <button className="btn btn-danger" disabled={ !this.props.main.hasChecked }
                                            onClick={ this.onDeleteClick.bind( this ) }>
                                        <i className="fa fa-trash"></i>
                                        Удалить
                                    </button> : ''
                            }
                            <div className="popup-wrap">
                                <button className="btn btn-info" onClick={ this.openPopup }>
                                    <i className="fa fa-sort-amount-asc"></i>
                                    Сортировка
                                </button>
                                <div className="popup popup--sorter">
                                    <form onSubmit={ this.onApplySort.bind( this ) }>
                                        <div className="popup-row">
                                            <span>Сортировать по</span>
                                            <select name="field" defaultValue={ this.props.filter.orderField }>
                                                <option value="id">ID</option>
                                                <option value="createAt">дате создания</option>
                                                <option value="form_name">названию формы</option>
                                                <option value="page_name">странице</option>
                                                <option value="email">e-mail</option>
                                            </select>
                                        </div>
                                        <div className="popup-row">
                                            <span>Напрвление</span>
                                            <select name="direction" defaultValue={ this.props.filter.orderDirection }>
                                                <option value="asc">по возрастанию</option>
                                                <option value="desc">по убыванию</option>
                                            </select>
                                        </div>
                                        <div className="d-flex justify-content-end">
                                            <button className="btn btn-info" type="submit">Применить</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="popup-wrap">
                                <button className="btn btn-info" onClick={ this.openPopup }>
                                    <i className="fa fa-filter"></i>
                                    Фильтр
                                </button>
                                <div className="popup">
                                    <form onSubmit={ this.onApplyFilter.bind( this ) }>
                                        <div className="popup-row">
                                            <span>ID</span>
                                            <input name="id" defaultValue={ this.props.filter.id }/>
                                        </div>
                                        <div className="popup-row">
                                            <span>Дата создания</span>
                                            <input name="createAt" className="js-datepicker" readOnly
                                                   defaultValue={ this.props.filter.createAt }/>
                                        </div>
                                        <div className="popup-row">
                                            <span>Форма</span>
                                            <input name="form_name" defaultValue={ this.props.filter.form_name }/>
                                        </div>
                                        <div className="popup-row">
                                            <span>Страница</span>
                                            <input name="from_page_title"
                                                   defaultValue={ this.props.filter.from_page_title }/>
                                        </div>
                                        <div className="popup-row">
                                            <span>Статус</span>
                                            <select name="status" defaultValue={ this.props.filter.status }>
                                                {
                                                    this.props.statuses.map( status => {
                                                        return (
                                                            <option value={ status.id }
                                                                    key={ status.id }>{ status.text }</option>
                                                        )
                                                    } )
                                                }
                                            </select>
                                        </div>
                                        <div className="popup-row">
                                            <span>E-mail</span>
                                            <input name="email" defaultValue={ this.props.filter.email }/>
                                        </div>
                                        <div className="popup-row">
                                            <span>Менеджер</span>
                                            <select name="responsible" defaultValue={ this.props.filter.responsible }>
                                                {
                                                    this.props.usersList.map( user => {
                                                        return (
                                                            <option value={ user.id }
                                                                    key={ user.id }>{ user.text }</option>
                                                        )
                                                    } )
                                                }
                                            </select>
                                        </div>
                                        <div className="d-flex justify-content-end">
                                            <button className="btn btn-info" type="submit">Применить</button>
                                            <button className="btn btn-danger" type="button"
                                                    onClick={ this.clearFilter.bind( this ) }>Очистить
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-4 d-flex justify-content-end">
                            <button className="btn btn-secondary"
                                    onClick={ this.onExportClick.bind( this ) }>Экспортировать в Excel
                            </button>
                            {
                                this.props.user.isAdmin === 'y' ?
                                    <Link to="/detail/add/" className="btn btn-success">Добавить заявку</Link> : ''
                            }
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default connect(
    state => ( {
        main: state.main,
        user: state.user,
        statuses: state.statuses,
        usersList: state.usersList,
        filter: state.filter,
        items: state.items
    } ),
    dispatch => ( {
        setSort: ( payload ) => {
            dispatch( { type: filterActions.setSort, payload: payload } )
        },
        setFilter: ( payload ) => {
            dispatch( { type: filterActions.setFilter, payload: payload } );
        },
        getItems: ( filter ) => {
            dispatch( loadItems( filter ) );
        },
        setIsLoading: ( status ) => {
            dispatch( { type: mainActions.setIsLoading, payload: status } );
        },
        setHasChecked: ( checked ) => {
            dispatch( { type: mainActions.hasChecked, payload: checked } );
        }
    } )
)( Buttons );