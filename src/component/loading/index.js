/*
 * author Pavel Nikitin
 * date 25.11.2017
 */

import React from 'react';

const Loading = props => {
    return (
        <div className='page-loading'>
            <img src={`${process.env.PUBLIC_URL}/images/loading.gif`} alt="Loading"/>
            <span>{props.text}</span>
        </div>
    )
}

export default Loading;