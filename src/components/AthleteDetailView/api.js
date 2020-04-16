//@flow

import axios from 'axios';
import { getResponseMessage, ok } from '../../apiHelper';
import type { AthleteResultInfoType, AthleteInfoType } from '../../types';
import { athlete_info_url, athlete_results_url, athlete_photo_url } from '../../constants';

export function getAthleteInfo(athlete_id: number): Promise<AthleteInfoType> {
    return axios
        .get(athlete_info_url(athlete_id))
        .then((result): AthleteInfoType => {
            if (!ok(result)) throw result;
            return result.data
        })
        .catch(err => {
            throw new Error(getResponseMessage(err));
        })
}

export function getAthleteResultInfo(athlete_id: number): Promise<AthleteResultInfoType> {
    return axios
        .get(athlete_results_url(athlete_id))
        .then((result): AthleteResultInfoType => {
            if (!ok(result)) throw result;
            return result.data
        })
        .catch(err => {
            throw new Error(getResponseMessage(err));
        })
}

export function getAthletePicture(athlete_id: number): Promise<string> {
    return axios
        .get(athlete_photo_url(athlete_id), {
            responseType: 'arraybuffer'
        })
        .then((result): string => {
            if (!ok(result)) throw result;
            return new Buffer(result.data, 'binary').toString('base64')
        })
        .catch(err => {
            throw new Error(getResponseMessage(err));
        })
}

