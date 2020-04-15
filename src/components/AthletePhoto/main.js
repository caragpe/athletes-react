// @flow

import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { getAthletePicture } from './api';
import { useFetch } from '../../apiHelper';

type Props = {
    athlete_photo_id: number
};

const AthletePhoto = (props: Props) => {
    const { athlete_photo_id } = props;

    function getAthletePhoto() {
        return getAthletePicture(athlete_photo_id);
    }

    const { data, loading } = useFetch<string>(getAthletePhoto, null);

    return (
        <div>
            {loading && (
                <div><CircularProgress /></div>
            )}
            {!loading && data && (
                <div>
                    <img src={`data:image/jpeg;base64,${data}`} alt={athlete_photo_id} />
                </div>
            )}
        </div>
    )
}

export default AthletePhoto;