// @flow

import React from 'react';
import { Box, CircularProgress } from '@material-ui/core';
import { getAthleteResultInfo } from './api';
import { useFetch } from '../../apiHelper';
import type { AthleteInfoType, AthleteResultInfoType } from '../../types';
import AthletePicture from '../AthletePhoto/main';
import './athletecard.css';


type Props = {
    athlete: AthleteInfoType
};

const AthleteCard = (props: Props) => {
    const { athlete } = props;

    function getAthleteResults() {
        return getAthleteResultInfo(athlete.athlete_id);
    };

    const { data, loading } = useFetch<Array<AthleteResultInfoType>>(getAthleteResults, null);
    
    return (
        <div>
            {loading && (
                <div><CircularProgress /></div>
            )}
            {!loading && data && (
                <div class='image'>
                    <Box p={0.5} m={1} bgcolor="grey.300">
                        <AthletePicture athlete_photo_id={athlete.photo_id} />
                        <h2><span>{athlete.name} {athlete.surname}</span></h2>
                    </Box>
                </div>
            )}
        </div>
    )
}

export default AthleteCard;