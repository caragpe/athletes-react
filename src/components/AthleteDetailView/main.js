// @flow

import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from '../../apiHelper';
import { getAthleteResultsInfo } from '../api';
import { Thumbnail, EmptyThumbnail } from '../Thumbnail/main';
import type { AthleteType, AthleteResultsType } from '../../types';
import ReactMarkdown from "react-markdown";
import back_arrow from '../../assets/images/back_arrow.svg';
import './detailedview.css';

type Props = {
    athlete: AthleteType,
    picture: string
};

const AtheleteDetailedView = (props: Props) => {
    const { athlete, picture } = props;

    function getAthleteResults() {
        return getAthleteResultsInfo(athlete.athlete_id);
    };

    const results = useFetch<Array<AthleteResultsType>>(getAthleteResults, null);

    return (
        <Fragment>
        <div className='container'>
            <div className='containerbox'>
                <Link to={{pathname: `/` }} data-qa="arrow_back_from_athlete_detailed_card">
                    <img className={'arrowback'} src={back_arrow} alt="Back"/>
                </Link>
            </div>
            <div className='containerbox' data-qa="athlete_name_surname">
                <span>{(athlete && athlete.name) || 'n/a'} {(athlete && athlete.surname) || 'n/a'} details</span> 
            </div>
        </div>
        <div className='container'>
            <div className='containerbox'>
                {picture.length !== 0 && (
                    <Thumbnail 
                        picture={picture} 
                        is_loading={false}
                        athlete_id={athlete.athlete_id}
                        data-qa="thumbnail_athlete_detailed_card"
                    />
                )}
                {picture.length === 0 && (
                    <EmptyThumbnail 
                        athlete_id={athlete.athlete_id} 
                        data-qa="empty_thumbnail_athlete_detailed_card"
                    />
                )}
            </div>
            <div className='boxincolumn'>
                <div className='rowelement' data-qa="athlete_info_name">
                    Name: {athlete.name} {athlete.surname}
                </div>
                <div className='rowelement' data-qa="athlete_info_dob">
                    DOB: {athlete.dateOfBirth}
                </div>
                <div className='rowelement' data-qa="athlete_info_weight">
                    Weight: {athlete.weight} kg
                </div>
                <div className='rowelement' data-qa="athlete_info_height">
                    Height: {athlete.height} cm
                </div>
            </div>
        </div>
        <div className='medalcontainer'>
            <div className='spacing' data-qa="medals_container">
                <strong>Medals</strong>
            </div>
            <Fragment>
                {results && results.data && results.data.map((game: AthleteResultsType) =>
                    <GameResult 
                        key={game.city}
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
            <div className='city' data-qa="medal_container_by_city">- <strong>{city}</strong></div>
            {gold > 0 && (
                <div className='medal' data-qa="gold_count">G {props.gold}</div>
            )}
            {silver > 0 && (
                <div className='medal' data-qa="silver_count">S {props.silver}</div>
            )}
            {bronze > 0 && (
                <div className='medal' data-qa="bronze_count">B {props.bronze}</div>
            )}
        </div>
    );
}
export default AtheleteDetailedView;