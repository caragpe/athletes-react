//@flow

import axios from 'axios';
import { getResponseMessage, ok } from '../../apiHelper';
import type { AthleteResultInfoType } from '../../types';
import { athlete_info_url } from '../../constants';

export function getAthleteResultInfo(athlete_id: number): Promise<Array<AthleteResultInfoType>> {
    return axios
        .get(athlete_info_url(athlete_id))
        .then((result): Array<AthleteResultInfoType> => {
            if (!ok(result)) throw result;
            return result.data
        })
        .catch(err => {
            throw new Error(getResponseMessage(err));
        })
}

