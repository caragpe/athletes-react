// @flow

import React from 'react';
import { Box, CircularProgress } from '@material-ui/core';
// import { getAthleteResultInfo } from './api';
// import { useFetch } from '../../apiHelper';
// import type { AthleteInfoType, AthleteResultInfoType } from '../../types';
// import AthletePicture from '../AthletePhoto/main';
// import './athletecard.css';

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
    match: MatchType
};

const AtheleteDetailView = (props: Props) => {
    const athlete_id = props.match.params.id;
    const isExact = props.match.isExact;

    console.log(props);
    // const { athlete } = props;

    // function getAthleteResults() {
    //     return getAthleteResultInfo(athlete.athlete_id);
    // };

    // const { data, loading } = useFetch<Array<AthleteResultInfoType>>(getAthleteResults, null);
    
    return (
        <div>
Hey
        </div>
    )
}

export default AtheleteDetailView;