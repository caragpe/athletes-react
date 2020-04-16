// //@flow

// import axios from 'axios';
// import { getResponseMessage, ok } from '../../apiHelper';
// import type { GameType } from '../../types';
// import { games_url } from '../../constants';

// export function listGames(): Promise<Array<GameType>> {
//     return axios
//         .get(games_url())
//         .then((result): Array<GameType> => {
//             if (!ok(result)) throw result;
//             return result.data
//         })
//         .catch(err => {
//             throw new Error(getResponseMessage(err));
//         })
// }
