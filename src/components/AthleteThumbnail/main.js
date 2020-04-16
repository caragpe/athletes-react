// @flow

import React from 'react';
import { Link } from 'react-router-dom';
import { Box, CircularProgress } from '@material-ui/core';
import { getAthleteResultInfo, getAthletePicture } from './api';
import { useFetch } from '../../apiHelper';
import type { AthleteInfoType, AthleteResultInfoType } from '../../types';
import { Thumbnail, EmptyThumbnail } from '../Thumbnail/main';
import './athletethumbnail.css';


type Props = {
    athlete: AthleteInfoType
};

const AthleteThumbnail = (props: Props) => {
    const { athlete } = props;

    function getAthleteResults() {
        return getAthleteResultInfo(athlete.athlete_id);
    };

    function getAthletePhoto() {
        return getAthletePicture(athlete.photo_id);
    }

    const photo = useFetch<string>(getAthletePhoto, null);
    const { data, loading } = useFetch<Array<AthleteResultInfoType>>(getAthleteResults, null);
    
    return (
        <div>
            {loading && (
                <div><CircularProgress /></div>
            )}
            {!loading && data && (
                <div className='image'>
                    <Link to={{
                        pathname: `/athlete/${athlete.athlete_id}`,
                        query: `${athlete.athlete_id}`,
                        picture: `${(photo && photo.data) || ''}`,
                        athlete_info: athlete
                    }} >
                        <Box p={0.5} m={1} bgcolor="grey.300">
                            {photo && (
                                <Thumbnail 
                                    picture={photo.data} 
                                    is_loading={photo.loading} 
                                />
                            )}
                            {!photo && (
                                <EmptyThumbnail />
                            )}
                            <h2><span>{athlete.name} {athlete.surname}</span></h2>
                        </Box>
                    </Link>
                </div>
            )}
        </div>
    )
}

export default AthleteThumbnail;