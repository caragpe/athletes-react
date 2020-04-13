//@flow

import axios from 'axios';
import { getResponseMessage, ok } from '../../apiHelper';
import type { AthleteInfoType } from '../../types';
import { athletes_by_game_url } from '../../constants';

export function getAthletesByGame(game_id: number): Promise<Array<AthleteInfoType>> {
    return axios
        .get(athletes_by_game_url(game_id))
        .then((result): Array<AthleteInfoType> => {
            if (!ok(result)) throw result;
            return result.data
        })
        .catch(err => {
            throw new Error(getResponseMessage(err));
        })
}
