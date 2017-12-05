/*
 * author Pavel Nikitin
 * date 19.11.2017
 */

import React from 'react';
import Header from '../header';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadDetailItem, loadProductsList, loadItems } from "../../actions";
import { Field, reduxForm, getFormValues } from 'redux-form';
import { LINK_UPDATE_ITEM, LINK_ADD_ITEM, mainActions } from "../../constants";
import Loading from '../loading';
import $ from 'jquery';
import './style.css';

const validate = values => {
    const errors = {};
    if ( values.env === 'n' ) {
        if ( values.in_crm === '0' && !values.in_crm_comment ) {
            errors.in_crm_comment = 'Заявка не перенесена в CRM, укажите причину';
        }
        if ( !values.result ) {
            errors.result = 'Укажите итог разговора с клиентом';
        }
        if ( !values.name ) {
            errors.name = 'Укажите имя клиента';
        }
    } else {
        if ( !values.name ) {
            errors.name = 'Укажите имя клиента';
        }
        if ( !values.form_name ) {
            errors.form_name = 'Укажите название формы';
        }
        if ( !values.from_page_title ) {
            errors.from_page_title = 'Укажите заголовок страницы';
        }
        if ( !values.from_page_url ) {
            errors.from_page_url = 'Укажите URL страницы';
        }
        if ( !values.referrer ) {
            errors.referrer = 'Укажите URL источника перехода';
        }
    }
    return errors;
};

const SelectField = ( { input, items, meta: { touched, error } } ) => (
    <div>
        <select { ...input } className="form-control">
            {
                items.map( item => {
                    return (
                        <option value={ item.id } key={ item.id }>{ item.text }</option>
                    )
                } )
            }
        </select>
        { touched && error && <span>{ error }</span> }
    </div>
);
const AreaField = ( { input, meta: { touched, error } } ) => (
    <div>
        <textarea { ...input }
                  className={ "form-control" + ( touched && error ? ' has-error' : '' ) }>{ input.value }</textarea>
        { touched && error && <span className="errorMessage">{ error }</span> }
    </div>
);
const TextField = ( { input, meta: { touched, error } } ) => (
    <div>
        <input { ...input } className={ "form-control" + ( touched && error ? ' has-error' : '' ) }
               value={ input.value }/>
        { touched && error && <span className="errorMessage">{ error }</span> }
    </div>
);

const initializeForm = ( item, user, statuses, products ) => {
    let status = item.status;
    let responsible = item.responsible;
    if (status === '1' && user.isAdmin === 'n')
        status = '2';
    if (responsible === '0' && user.isAdmin === 'n')
        responsible = user.id;
    return {
        env: user.isAdmin,
        id: item.id,
        responsible: responsible,
        status: statuses.findIndex( ( el ) => {
            return el.id === status
        } ),
        in_crm: item.in_crm,
        in_crm_comment: item.in_crm_comment,
        product: products.findIndex( ( el ) => {
            return el.id === item.product
        } ),
        result: item.result,
        form_name: item.form_name,
        name: item.name,
        email: item.email,
        content: item.content,
        from_page_title: item.from_page_title,
        from_page_url: item.from_page_url,
        referrer: item.referrer,
        phone: item.phone
    }
};

class Detail extends React.Component {
    componentWillMount() {
        $( document ).off( 'scroll' );
        const id = this.props.match.params.id;
        const { user, statuses, products } = this.props;
        if ( id !== 'add' ) {
            this.props.getItem( id );
        } else {
            this.props.initialize( { id: 'add' }, user, statuses, products );
        }
    }

    shouldComponentUpdate( nextProps, nextState ) {
        if ( !$.isEmptyObject( nextProps.item ) && $.isEmptyObject( this.props.item ) ) {
            const item = nextProps.item;
            this.props.initialize( initializeForm( item, nextProps.user, nextProps.statuses, nextProps.products ) );
        }
        return true;
    }

    onSubmit( values ) {
        const self = this;
        const link = ( values.id === 'add' ) ? LINK_ADD_ITEM : LINK_UPDATE_ITEM;
        self.props.setIsLoading( true );
        $.ajax( {
            url: link,
            type: 'get',
            dataType: 'json',
            data: {
                id: values.id,
                values: values
            },
            success: function () {
                self.props.history.push( '/' );
            }
        } )
    }

    render() {
        const { handleSubmit, submitting, isLoading, user } = this.props;
        if ( isLoading ) {
            return (
                <Loading text="Загрузка..."/>
            )
        }
        return (
            <div>
                <Header/>
                <section className="section detail-title">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-1">
                                <Link to='/' className="back-link">
                                    <i className="fa fa-angle-left"/>
                                </Link>
                            </div>
                            <div className="col-10">
                                {
                                    ( this.props.match.params.id === 'add' ) ?
                                        'Новая заявка' : `Редактирование заявки №${this.props.match.params.id}`
                                }
                            </div>
                        </div>
                    </div>
                </section>
                {
                    ( this.props.item ) ?
                        <form className="detail-form" onSubmit={ handleSubmit( this.onSubmit.bind( this ) ) }>
                            <Field name="env" component="input" type="hidden"/>
                            <div className="container">
                                {
                                    ( this.props.match.params.id !== 'add' ) ?
                                        <div className="row justify-content-end">
                                            <div className="col-2">ID: { this.props.item.id }</div>
                                            <div className="col-4">Дата создания: { this.props.item.createAt }</div>
                                            <div className="col-4">
                                                Принят в работу:&nbsp;
                                                {
                                                    (this.props.item.in_work_time !== 0) ?
                                                        this.props.item.in_work_time : '-'
                                                }
                                            </div>
                                        </div> : ''
                                }
                                <div className="row">
                                    <label className="col-4">Ответственный менеджер</label>
                                    <div className="col-8">
                                        <Field
                                            name='responsible'
                                            component={ SelectField }
                                            items={ this.props.usersList }
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <label className="col-4">Статус заявки</label>
                                    <div className="col-8">
                                        <Field
                                            name='status'
                                            component={ SelectField }
                                            items={ this.props.statuses }
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <label className="col-4">
                                        {
                                            ( user.isAdmin === 'y' ) ?
                                                <span>Заявка перенесена в CRM</span> :
                                                <b>Заявка перенесена в CRM *</b>
                                        }
                                    </label>
                                    <div className="col-8">
                                        <Field
                                            name='in_crm'
                                            component={ SelectField }
                                            items={ [
                                                { id: '0', text: 'нет' },
                                                { id: '1', text: 'да' }
                                            ] }
                                        />
                                    </div>
                                </div>
                                {
                                    ( this.props.values && this.props.values.in_crm ) === '0' ?
                                        <div className="row">
                                            <label className="col-4">
                                                {
                                                    ( user.isAdmin === 'y' ) ?
                                                        <span>Причина отсутствия заявки в CRM</span> :
                                                        <b>Причина отсутствия заявки в CRM *</b>
                                                }
                                            </label>
                                            <div className="col-8">
                                                <Field
                                                    name='in_crm_comment'
                                                    component={ AreaField }
                                                    className="form-control"/>
                                            </div>
                                        </div> : ''
                                }
                                <div className="row">
                                    <label className="col-4">Итоговый продукт, который выбрал клиент</label>
                                    <div className="col-8">
                                        <Field name='product' component='select' className="form-control">
                                            {
                                                this.props.products.map( item => {
                                                    return (
                                                        <option value={ item.id } key={ item.id }>{ item.text }</option>
                                                    )
                                                } )
                                            }
                                        </Field>
                                    </div>
                                </div>
                                <div className="row">
                                    <label className="col-4">
                                        {
                                            ( this.props.user.isAdmin === 'y' ) ?
                                                <span>Итог разговора с клиентом</span> :
                                                <b>Итог разговора с клиентом *</b>
                                        }
                                    </label>
                                    <div className="col-8">
                                        <Field
                                            name='result'
                                            component={ AreaField }
                                            className="form-control"/>
                                    </div>
                                </div>
                                <div className="row">
                                    <label className="col-4">
                                        {
                                            ( user.isAdmin === 'y' ) ?
                                                <b>Форма, с которой пришла заявка *</b> :
                                                <span>Форма, с которой пришла заявка</span>
                                        }
                                    </label>
                                    <div className="col-8">
                                        <Field
                                            name='form_name'
                                            component={ TextField }
                                            className="form-control"
                                            props={ {
                                                disabled: ( this.props.user.isAdmin === 'n' )
                                            } }
                                        />
                                    </div>
                                </div>
                                {
                                    ( this.props.user.isAdmin === 'y' ) ?
                                        <span>
                                    <div className="row">
                                        <label
                                            className="col-4"><b>Заголовок страницы, с которой пришла заявка *</b></label>
                                        <div className="col-8">
                                            <Field
                                                name='from_page_title'
                                                component={ TextField }
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label className="col-4"><b>URL страницы, с которой пришла заявка *</b></label>
                                        <div className="col-8">
                                            <Field
                                                name='from_page_url'
                                                component={ TextField }
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                </span> :
                                        <div className="row">
                                            <label className="col-4">Страница, с которой была отправлена заявка</label>
                                            <div className="col-8">
                                                <a href={ this.props.item.from_page_url }>{ this.props.item.from_page_title }</a>
                                            </div>
                                        </div>
                                }
                                {
                                    ( this.props.user.isAdmin === 'y' ) ?
                                        <span>
                                    <div className="row">
                                        <label className="col-4"><b>URL источника перехода *</b></label>
                                        <div className="col-8">
                                            <Field
                                                name='referrer'
                                                component={TextField}
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                </span> :
                                        <div className="row">
                                            <label className="col-4">
                                                {
                                                    ( user.isAdmin === 'y' ) ?
                                                        <b>Источник перехода *</b> :
                                                        <span>Источник перехода</span>
                                                }
                                            </label>
                                            <div className="col-8">
                                                <a href={ this.props.item.referrer }>{ this.props.item.referrer }</a>
                                            </div>
                                        </div>
                                }
                                <div className="row">
                                    <label className="col-4"><b>Имя *</b></label>
                                    <div className="col-8">
                                        <Field
                                            name='name'
                                            component={ TextField }
                                            className="form-control"/>
                                    </div>
                                </div>
                                <div className="row">
                                    <label className="col-4">E-mail</label>
                                    <div className="col-8">
                                        <Field
                                            name='email'
                                            component={ TextField }
                                            className="form-control"/>
                                    </div>
                                </div>
                                <div className="row">
                                    <label className="col-4">Телефон</label>
                                    <div className="col-8">
                                        <Field
                                            name='phone'
                                            component={ TextField }
                                            className="form-control"/>
                                    </div>
                                </div>
                                <div className="row">
                                    <label className="col-4">Текст заявки</label>
                                    <div className="col-8">
                                        <Field
                                            name='content'
                                            component='textarea'
                                            className="form-control"/>
                                    </div>
                                </div>
                                <div className="row justify-content-end">
                                    <button className="btn btn-success" disabled={ submitting }>Сохранить</button>
                                    <Link to="/" className="btn btn-secondary" disabled={ submitting }>Отмена</Link>
                                </div>
                            </div>
                        </form> :
                        <Loading text="Загрузка..."/>
                }
            </div>
        );
    }
}

const routeDetail = withRouter( connect(
    state => ( {
        items: state.items,
        user: state.user,
        usersList: state.usersList,
        statuses: state.statuses,
        products: state.products,
        values: getFormValues( 'detailForm' )( state ),
        item: state.detail,
        isLoading: state.main.isLoading
    } ),
    dispatch => ( {
        getItem: ( id ) => {
            dispatch( loadDetailItem( id ) );
        },
        getProducts: () => {
            dispatch( loadProductsList() );
        },
        getItems: filter => {
            dispatch( loadItems( filter ) );
        },
        setIsLoading: status => {
            dispatch( { type: mainActions.setIsLoading, payload: status } );
        }
    } )
)( Detail ) );
export default reduxForm( {
    form: 'detailForm',
    validate
} )( routeDetail );