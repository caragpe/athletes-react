// @flow

import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from '../../apiHelper';
import { getAthleteResultInfo } from './api';
import { Thumbnail, EmptyThumbnail } from '../Thumbnail/main';
import type { AthleteInfoType, AthleteResultInfoType } from '../../types';
import ReactMarkdown from "react-markdown";
import back_arrow from '../../back_arrow.svg';
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
    const picture = props.picture;

    function getAthleteResults() {
        return getAthleteResultInfo(athlete_id);
    };

    const results = useFetch<Array<AthleteResultInfoType>>(getAthleteResults, null);

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
                {picture.length !== 0 && (
                    <Thumbnail 
                        picture={picture} 
                        is_loading={false} 
                    />
                )}
                {picture.length === 0 && (
                    <EmptyThumbnail />
                )}
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
        <div className='medalcontainer'>
            <div className='spacing'>
                <strong>Medals</strong>
            </div>
            <Fragment>
                {results && results.data && results.data.map((game: AthleteResultInfoType) =>
                    <GameResult 
                        city={game.city}
                        gold={game.gold}
                        silver={game.silver}
                        bronze={game.bronze}
                    /> 
                )}
            </Fragment>
        </div>
        <div className='biocontainer'>
            <div className='spacing'>
                <strong>Bio</strong>
            </div>
            <div className='bio'>
                <ReactMarkdown source={athlete.bio} excapeHtml={false}/>
            </div>
        </div>
        </Fragment>        
    )
}

type GameResultType = {
    city: string,
    gold: number,
    silver: number,
    bronze: number
};

const GameResult = (props: GameResultType) => {
    const { city, gold, silver, bronze } = props;
    return (
        <div className='game-medal__container'>
            <div className='city'>- <strong>{city}</strong></div>
            {gold > 0 && (
                <div className='medal'>G {props.gold}</div>
            )}
            {silver > 0 && (
                <div className='medal'>S {props.silver}</div>
            )}
            {bronze > 0 && (
                <div className='medal'>B {props.bronze}</div>
            )}
        </div>
    );
}
export default AtheleteDetailedView;