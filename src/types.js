// @flow

export type GameType = {
    game_id: number,
    city: string,
    year: number
};

export type AthleteInfoType = {
    athlete_id: number,
    name: string,
    surname: string,
    dateOfBirth: string,
    bio: string,
    weight: number,
    height: number,
    photo_id: number
};

export type AthleteResultInfoType = {
    city: number,
    year: number,
    gold: number,
    silver: number,
    bronze: number,
    fourths: number
};

export type AthletePictureType = {
    photo: string
}