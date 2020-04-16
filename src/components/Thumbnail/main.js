// @flow	

import React from 'react';	
import { CircularProgress } from '@material-ui/core';	
import portrait from '../../portrait.svg';	
import './thumbnail.css';	

type Props = {	
    picture: ?string,	
    is_loading: boolean	
};	

export const Thumbnail = (props: Props) => {	
    const { picture, is_loading } = props;	

    return (	
        <div>	
            {is_loading && (	
                <div><CircularProgress /></div>	
            )}	
            {!is_loading && picture && (	
                <div>	
                    <img src={`data:image/jpeg;base64,${picture}`} alt="" />	
                </div>	
            )}	
        </div>	
    )	
}	

export const EmptyThumbnail = () => {	
    return (	
        <div>	
            <img className={'no_image'} src={portrait} alt="n/a" />	
        </div>	
    )	
}
