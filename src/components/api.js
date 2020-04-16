//@flow

import axios from 'axios';
import { getResponseMessage, ok } from '../apiHelper'
import type { GameType, AthleteType, AthleteResultsType  } from '../types'; 
import { 
    games_url,
    athlete_info_url, 
    athlete_photo_url ,
    athletes_by_game_url
} from '../constants';

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

export function listGames(): Promise<Array<GameType>> {
    return axios
        .get(games_url())
        .then((result): Array<GameType> => {
            if (!ok(result)) throw result;
            return result.data
        })
        .catch(err => {
            throw new Error(getResponseMessage(err));
        })
}

export function getAthleteResultsInfo(athlete_id: number): Promise<Array<AthleteResultsType>> {
    return axios
        .get(athlete_info_url(athlete_id))
        .then((result): Array<AthleteResultsType> => {
            if (!ok(result)) throw result;
            return result.data
        })
        .catch(err => {
            throw new Error(getResponseMessage(err));
        })
}

export function getAthletesByGame(game_id: number): Promise<Array<AthleteType>> {
    return axios
        .get(athletes_by_game_url(game_id))
        .then((result): Array<AthleteType> => {
            if (!ok(result)) throw result;
            return result.data
        })
        .catch(err => {
            throw new Error(getResponseMessage(err));
        })
}
