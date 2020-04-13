//@flow

import axios from 'axios';
import { getResponseMessage, ok } from '../../apiHelper';
import type { AthleteResultInfo } from '../../types';
import { athlete_info_url } from '../../constants';

export function getAthleteResultInfo(athlete_id: number): Promise<Array<AthleteResultInfo>> {
    return axios
        .get(athlete_info_url(athlete_id))
        .then((result): Array<AthleteResultInfo> => {
            if (!ok(result)) throw result;
            return result.data
        })
        .catch(err => {
            throw new Error(getResponseMessage(err));
        })
}
