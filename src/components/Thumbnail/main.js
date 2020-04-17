// @flow	

import React from 'react';	
import { CircularProgress } from '@material-ui/core';	
import portrait from '../../assets/images/portrait.svg';	
import './thumbnail.css';	

type Props = {	
    picture: ?string,	
    is_loading: boolean,
    athlete_id: number
};	

export const Thumbnail = (props: Props) => {	
    const { picture, is_loading, athlete_id } = props;	

    return (	
        <div>	
            {is_loading && (	
                <div><CircularProgress /></div>	
            )}	
            {!is_loading && picture && (	
                <div>	
                    <img 
                        src={`data:image/jpeg;base64,${picture}`} 
                        data-testid={`thumbnail_athlete_${athlete_id}`}
                        alt="" 
                    />	
                </div>	
            )}	
        </div>	
    )	
}	

type EmptyThumbnailProps = {
    athlete_id: number
};

export const EmptyThumbnail = (props: EmptyThumbnailProps) => {	
    const { athlete_id } = props;
    return (	
        <div>	
            <img 
                className={'no_image'} 
                src={portrait} 
                data-testid={`empty_thumbnail_athlete_${athlete_id}`}
                alt="n/a" 
            />	
        </div>	
    )	
}
