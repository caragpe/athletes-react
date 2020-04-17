// @flow

import React from 'react';
import { Link } from 'react-router-dom';
import { Box, CircularProgress } from '@material-ui/core';
import { getAthleteResultsInfo, getAthletePicture } from '../api';
import { useFetch } from '../../apiHelper';
import type { AthleteType, AthleteResultsType } from '../../types';
import { Thumbnail, EmptyThumbnail } from '../Thumbnail/main';
import './athletethumbnail.css';


type Props = {
    athlete: AthleteType
};

const AthleteThumbnail = (props: Props) => {
    const { athlete } = props;

    function getAthleteResults() {
        return getAthleteResultsInfo(athlete.athlete_id);
    };

    function getAthletePhoto() {
        return getAthletePicture(athlete.photo_id);
    }

    const photo = useFetch<string>(getAthletePhoto, null);
    const { data, loading } = useFetch<Array<AthleteResultsType>>(getAthleteResults, null);

    return (
        <div>
            {loading && (
                <div><CircularProgress /></div>
            )}
            {!loading && data && (
                <div data-testid={`container_athlete_thumbnail_${athlete.athlete_id}`} className='ahtlete-link__image'>
                    <Link to={{
                            pathname: `athlete/${athlete.athlete_id}`,
                            query: `${athlete.athlete_id}`,
                            picture: `${(photo && photo.data) || '' }`,
                            athlete_info: athlete
                        }}
                        data-testid={`link_athlete_thumbnail_${athlete.athlete_id}`} 
                    >
                        <Box p={0.5} m={1} bgcolor="grey.300" data-testid={`athlete_box_thumbnail_${athlete.athlete_id}`}>
                            {photo && (
                                <Thumbnail 
                                    picture={photo.data} 
                                    is_loading={photo.loading}
                                    athlete_id={athlete.athlete_id}
                                />
                            )}
                            {!photo && (
                                <EmptyThumbnail athlete_id={athlete.athlete_id}/>
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