//@flow

import axios from 'axios';
import { getResponseMessage, ok } from '../../apiHelper'

export type GameType = {
    game_id: number,
    city: string,
    year: number
};

export function listGames(): Promise<Array<GameType>> {
    return axios
        .get('http://localhost:3000/games')
        .then((result): Array<GameType> => {
            if (!ok(result)) throw result;
            return result.data
        })
        .catch(err => {
            throw new Error(getResponseMessage(err));
        })
}
