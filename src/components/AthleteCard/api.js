//@flow

import axios from 'axios';
import { getResponseMessage, ok } from '../../apiHelper';
import type { AthleteResultInfo, AthletePicture } from '../../types';
import { athlete_info_url, athlete_photo_url } from '../../constants';

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

export function getAthletePicture(athlete_id: number): Promise<AthletePicture> {
    return axios
        .get(athlete_photo_url(athlete_id))
        .then((result): Array<AthletePicture> => {
            if (!ok(result)) throw result;
            return result.data
        })
        .catch(err => {
            throw new Error(getResponseMessage(err));
        })
}
