// @flow

import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import back_arrow from '../../back_arrow.svg';
import { Thumbnail, EmptyThumbnail } from '../Thumbnail/main';
// import { getAthleteResultInfo } from './api';
import type { AthleteInfoType, AthleteResultInfoType } from '../../types';
import ReactMarkdown from "react-markdown";
import './detailedview.css';


type MatchIdType = {
    id: number
};

type MatchType = {
    isExact: boolean,
    params: MatchIdType,
    path: string,
    url: string
};

type Props = {
    athlete: AthleteInfoType,
    match: MatchType,
    picture: string
};

const AtheleteDetailedView = (props: Props) => {
    const athlete_id = props.match.params.id;
    const athlete = props.athlete;
    const isExact = props.match.isExact;
    const picture = props.picture;


    console.log(props);

    return (
        <Fragment>
        <div className='container'>
            <div className='containerbox'>
                <Link to={{pathname: `/` }}>
                    <img className={'arrowback'} src={back_arrow} alt="Back"/>
                </Link>
            </div>
            <div className='containerbox'>
                <span>{(athlete && athlete.name) || 'n/a'} {(athlete && athlete.surname) || 'n/a'}</span> 
            </div>
        </div>
        <div className='container'>
            <div className='containerbox'>
                <Thumbnail 
                    picture={picture} 
                    is_loading={false} 
                />
            </div>
            <div className='boxincolumn'>
                <div className='rowelement'>
                    Name: {athlete.name} {athlete.surname}
                </div>
                <div className='rowelement'>
                    DOB: {athlete.dateOfBirth}
                </div>
                <div className='rowelement'>
                    Weight: {athlete.weight} kg
                </div>
                <div className='rowelement'>
                    Height: {athlete.height} cm
                </div>
            </div>
        </div>
        <div>
            <div>
                Bio
            </div>
            <div className='bio'>
                <ReactMarkdown source={athlete.bio} excapeHtml={false}/>
            </div>
        </div>
        </Fragment>        
    )
}

export default AtheleteDetailedView;