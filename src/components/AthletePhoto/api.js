//@flow

import axios from 'axios';
import { getResponseMessage, ok } from '../../apiHelper';
import type { AthletePictureType } from '../../types';
import { athlete_photo_url } from '../../constants';


export function getAthletePicture(athlete_id: number): Promise<AthletePictureType> {
    return axios
        .get(athlete_photo_url(athlete_id))
        .then((result): AthletePictureType => {
            if (!ok(result)) throw result;
            return result
        })
        .catch(err => {
            throw new Error(getResponseMessage(err));
        })
}
