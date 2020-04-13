// @flow

import React from 'react';
import { Box , Button, CircularProgress } from '@material-ui/core';
import { getAthleteResultInfo } from './api';
import { useFetch } from '../../apiHelper';
import type { AthleteInfoType, AthleteResultInfoType, AthletePictureType } from '../../types';
import AthletePicture from '../AthletePhoto/main';


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
                <div>
                    <Box p={1} m={1} bgcolor="grey.300">
                        <h2>{athlete.surname}</h2>
                        <p>{athlete.name}</p>

                        <Button className="CheckButton">
                            View details
                        </Button>
                        <AthletePicture athlete_photo_id={athlete.photo_id} />
                    </Box>
                </div>
            )}
        </div>
    )
}

export default AthleteCard;