// //@flow

// import axios from 'axios';
// import { getResponseMessage, ok } from '../../apiHelper';
// // import type { AthletePictureType } from '../../types';
// import { athlete_photo_url } from '../../constants';


// export function getAthletePicture(athlete_id: number): Promise<string> {
//     return axios
//         .get(athlete_photo_url(athlete_id), {
//             responseType: 'arraybuffer'
//         })
//         .then((result): string => {
//             if (!ok(result)) throw result;
//             return new Buffer(result.data, 'binary').toString('base64')
//         })
//         .catch(err => {
//             throw new Error(getResponseMessage(err));
//         })
// }
